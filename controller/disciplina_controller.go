package controller

import (
	"fmt"
	"go-api/model"
	"go-api/service"
	"go-api/usecase"
	"net/http"
	"strconv"
	"strings"

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
	disciplinas, err := d.disciplinaUsecase.GetDisciplinas()
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
