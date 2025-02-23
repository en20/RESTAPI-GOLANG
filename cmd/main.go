package main

import (
	"go-api/controller"
	"go-api/db"
	"go-api/repository"
	"go-api/usecase"

	"os"

	"github.com/gin-gonic/gin"
)

func main() {

	server := gin.Default()

	dbConnection, err := db.ConnectDB()
	if err != nil {
		panic(err)
	}

	// Disciplina
	DisciplinaRepository := repository.NewDisciplinaRepository(dbConnection)
	DisciplinaUsecase := usecase.NewDisciplinaUsecase(DisciplinaRepository)
	DisciplinaController := controller.NewDisciplinaController(DisciplinaUsecase)

	ProductRepository := repository.NewProductRepository(dbConnection)
	ProductUsecase := usecase.NewProductUsecase(ProductRepository)
	ProductController := controller.NewProductController(ProductUsecase)

	server.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	server.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	server.GET("/products", ProductController.GetProducts)
	server.GET("/product/:id", ProductController.GetProductByID)
	server.POST("/product", ProductController.CreateProduct)
	server.PUT("/product/:id", ProductController.UpdateProduct)
	server.DELETE("/product/:id", ProductController.DeleteProduct)
	server.POST("/product/:id/files", ProductController.UploadProductFiles)

	// Rotas da Disciplina
	server.GET("/disciplinas", DisciplinaController.GetDisciplinas)
	server.POST("/disciplina", DisciplinaController.CreateDisciplina)
	server.GET("/disciplina/:id", DisciplinaController.GetDisciplinaByID)
	server.PUT("/disciplina/:id", DisciplinaController.UpdateDisciplina)
	server.DELETE("/disciplina/:id", DisciplinaController.DeleteDisciplina)
	server.POST("/disciplina/:id/provas", DisciplinaController.UploadProva)
	server.GET("/download/prova", DisciplinaController.DownloadProva)
	server.GET("/download/file", ProductController.DownloadFile)

	server.GET("/test-db", func(c *gin.Context) {
		var count int
		err := dbConnection.QueryRow("SELECT COUNT(*) FROM disciplina").Scan(&count)
		if err != nil {
			c.JSON(500, gin.H{
				"error":    err.Error(),
				"detail":   "Erro ao consultar banco de dados"
			})
			return
		}
		
		// Buscar uma disciplina para teste
		var disciplina struct {
			ID   int
			Nome string
		}
		err = dbConnection.QueryRow("SELECT id, nome FROM disciplina LIMIT 1").Scan(&disciplina.ID, &disciplina.Nome)
		if err != nil {
			c.JSON(500, gin.H{
				"error":    err.Error(),
				"detail":   "Erro ao buscar disciplina"
			})
			return
		}
		
		c.JSON(200, gin.H{
			"disciplinas_count": count,
			"exemplo_disciplina": disciplina,
			"status":             "conectado"
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server.Run(":" + port)
}
