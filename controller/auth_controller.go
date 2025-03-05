package controller

import (
	"go-api/model"
	"go-api/repository"
	"go-api/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	userRepo    *repository.UserRepository
	authService *service.AuthService
}

func NewAuthController(userRepo *repository.UserRepository, authService *service.AuthService) *AuthController {
	return &AuthController{
		userRepo:    userRepo,
		authService: authService,
	}
}

func (ac *AuthController) Register(c *gin.Context) {
	var req model.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := ac.authService.HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao processar senha"})
		return
	}

	user := model.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: hashedPassword,
		Role:     "user", // Papel padrão
	}

	if err := ac.userRepo.Create(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao criar usuário"})
		return
	}

	token, err := ac.authService.GenerateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao gerar token"})
		return
	}

	user.Password = "" // Não retornar a senha
	c.JSON(http.StatusOK, model.AuthResponse{
		Token: token,
		User:  user,
	})
}

func (ac *AuthController) Login(c *gin.Context) {
	var req model.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := ac.userRepo.FindByEmail(req.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "credenciais inválidas"})
		return
	}

	if !ac.authService.CheckPasswordHash(req.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "credenciais inválidas"})
		return
	}

	token, err := ac.authService.GenerateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao gerar token"})
		return
	}

	user.Password = "" // Não retornar a senha
	c.JSON(http.StatusOK, model.AuthResponse{
		Token: token,
		User:  user,
	})
}

func (ac *AuthController) GetAllUsers(c *gin.Context) {
	users, err := ac.userRepo.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao buscar usuários"})
		return
	}
	c.JSON(http.StatusOK, users)
}
