package main

import (
	"go-api/controller"
	"go-api/db"
	"go-api/repository"
	"go-api/usecase"

	"github.com/gin-gonic/gin"
)

func main() {

	server := gin.Default()

	dbConnection, err := db.ConnectDB()
	if err != nil {
		panic(err)
	}

	ProductRepository := repository.NewProductRepository(dbConnection)
	ProductUsecase := usecase.NewProductUsecase(ProductRepository)
	ProductController := controller.NewProductController(ProductUsecase)

	server.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
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
	server.GET("/download", ProductController.DownloadFile)
	server.Run(":8080")
}
