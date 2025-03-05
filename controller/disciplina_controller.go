package controller

import (
	"fmt"
	"go-api/model"
	"go-api/service"
	"go-api/usecase"
	"net/http"
	"strconv"
	"strings"

	"log"

	"github.com/gin-gonic/gin"
)

type disciplinaController struct {
	disciplinaUsecase usecase.DisciplinaUsecase
}

func NewDisciplinaController(usecase usecase.DisciplinaUsecase) disciplinaController {
	return disciplinaController{
		disciplinaUsecase: usecase,
	}
}

func (d *disciplinaController) GetDisciplinas(c *gin.Context) {
	semestre := c.Query("semestre")
	var disciplinas []model.Disciplina
	var err error

	if semestre != "" {
		semestreInt, err := strconv.Atoi(semestre)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "semestre inválido"})
			return
		}
		disciplinas, err = d.disciplinaUsecase.GetDisciplinasBySemestre(semestreInt)
	} else {
		disciplinas, err = d.disciplinaUsecase.GetDisciplinas()
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, disciplinas)
}

func (d *disciplinaController) CreateDisciplina(c *gin.Context) {
	var disciplina model.Disciplina
	if err := c.BindJSON(&disciplina); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	createdDisciplina, err := d.disciplinaUsecase.CreateDisciplina(disciplina)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, createdDisciplina)
}

func (d *disciplinaController) GetDisciplinaByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	disciplina, err := d.disciplinaUsecase.GetDisciplinaByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, disciplina)
}

func (d *disciplinaController) UpdateDisciplina(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var disciplina model.Disciplina
	if err := c.BindJSON(&disciplina); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	disciplina.ID = id
	if err := d.disciplinaUsecase.UpdateDisciplina(disciplina); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Disciplina atualizada com sucesso"})
}

func (d *disciplinaController) DeleteDisciplina(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	if err := d.disciplinaUsecase.DeleteDisciplina(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Disciplina deletada com sucesso"})
}

func (d *disciplinaController) UploadProva(c *gin.Context) {
	disciplinaID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de disciplina inválido"})
		return
	}

	nomeProva := c.PostForm("name")
	if nomeProva == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nome da prova é obrigatório"})
		return
	}

	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	s3Service, err := service.NewS3Service()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Falha ao inicializar serviço S3"})
		return
	}

	fileURL, err := s3Service.UploadFile(file, disciplinaID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Falha ao fazer upload da prova: " + err.Error()})
		return
	}

	err = d.disciplinaUsecase.AddDisciplinaProva(disciplinaID, nomeProva, fileURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Falha ao salvar prova"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Prova enviada com sucesso",
		"url":     fileURL,
	})
}

func (d *disciplinaController) DownloadProva(c *gin.Context) {
	key := c.Query("key")
	if key == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "key is required"})
		return
	}

	s3Service, err := service.NewS3Service()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Falha ao inicializar serviço S3"})
		return
	}

	content, err := s3Service.GetFileContent(key)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Falha ao obter prova"})
		return
	}

	filename := strings.Split(key, "/")[len(strings.Split(key, "/"))-1]
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", filename))
	c.Data(http.StatusOK, "application/octet-stream", content)
}

func (d *disciplinaController) SyncProvas(ctx *gin.Context) {
	// 1. Pegar todas as provas do banco
	provas, err := d.disciplinaUsecase.GetAllProvas()
	if err != nil {
		ctx.JSON(500, gin.H{"error": "Erro ao buscar provas"})
		return
	}

	// 2. Inicializar serviço S3
	s3Service, err := service.NewS3Service()
	if err != nil {
		ctx.JSON(500, gin.H{"error": "Erro ao inicializar serviço S3"})
		return
	}

	// 3. Para cada prova, verificar se existe no S3
	for _, prova := range provas {
		exists, err := s3Service.FileExists(prova.URL)
		if err != nil {
			log.Printf("Erro ao verificar prova %d: %v", prova.ID, err)
			continue
		}

		if !exists {
			// Se o arquivo não existe no S3, deletar do banco
			err := d.disciplinaUsecase.DeleteProva(prova.ID)
			if err != nil {
				log.Printf("Erro ao deletar prova %d: %v", prova.ID, err)
			}
		}
	}

	ctx.JSON(200, gin.H{"message": "Sincronização concluída"})
}
