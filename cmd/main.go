package main

import (
	"go-api/controller"
	"go-api/db"
	"go-api/middleware"
	"go-api/repository"
	"go-api/service"
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

	// Auth Services
	authService := service.NewAuthService()
	userRepository := repository.NewUserRepository(dbConnection)
	authController := controller.NewAuthController(userRepository, authService)

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

	// Public routes
	server.POST("/auth/register", authController.Register)
	server.POST("/auth/login", authController.Login)
	server.GET("/users", authController.GetAllUsers)

	// Rotas públicas de disciplinas
	server.GET("/disciplinas", DisciplinaController.GetDisciplinas)
	server.GET("/disciplina/:id", DisciplinaController.GetDisciplinaByID)

	// Protected routes group
	protected := server.Group("")
	protected.Use(middleware.AuthMiddleware(authService))
	{
		// Rotas protegidas de disciplinas
		protected.POST("/disciplina", DisciplinaController.CreateDisciplina)
		protected.PUT("/disciplina/:id", DisciplinaController.UpdateDisciplina)
		protected.DELETE("/disciplina/:id", DisciplinaController.DeleteDisciplina)
		protected.POST("/disciplina/:id/provas", DisciplinaController.UploadProva)
		protected.GET("/download/prova", DisciplinaController.DownloadProva)
		protected.POST("/sync-provas", DisciplinaController.SyncProvas)

		// Rotas protegidas de usuário
		protected.GET("/user", authController.GetUser)
	}

	server.GET("/test-db", func(c *gin.Context) {
		var count int
		err := dbConnection.QueryRow("SELECT COUNT(*) FROM disciplina").Scan(&count)
		if err != nil {
			c.JSON(500, gin.H{
				"error":  err.Error(),
				"detail": "Erro ao consultar banco de dados",
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
				"error":  err.Error(),
				"detail": "Erro ao buscar disciplina",
			})
			return
		}

		c.JSON(200, gin.H{
			"disciplinas_count":  count,
			"exemplo_disciplina": disciplina,
			"status":             "conectado",
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server.Run(":" + port)
}
