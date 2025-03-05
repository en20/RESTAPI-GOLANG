package repository

import (
	"database/sql"
	"fmt"
	"go-api/model"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *model.User) error {
	query := `
		INSERT INTO users (name, email, password, role)
		VALUES ($1, $2, $3, $4)
		RETURNING id
	`
	err := r.db.QueryRow(query, user.Name, user.Email, user.Password, user.Role).Scan(&user.ID)
	if err != nil {
		fmt.Printf("Erro ao criar usuário: %v\n", err)
		return err
	}
	return nil
}

func (r *UserRepository) FindByEmail(email string) (model.User, error) {
	var user model.User
	query := `
		SELECT id, name, email, password, role
		FROM users
		WHERE email = $1
	`
	err := r.db.QueryRow(query, email).Scan(&user.ID, &user.Name, &user.Email, &user.Password, &user.Role)
	return user, err
}

func (r *UserRepository) GetAllUsers() ([]model.User, error) {
	var users []model.User
	query := `
		SELECT id, name, email, role
		FROM users
		ORDER BY id ASC
	`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user model.User
		err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.Role)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}
