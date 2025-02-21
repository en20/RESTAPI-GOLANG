package repository

import (
	"database/sql"
	"fmt"
	"go-api/model"
	"go-api/service"
	"strings"
)

type DisciplinaRepository struct {
	connection *sql.DB
}

func NewDisciplinaRepository(connection *sql.DB) DisciplinaRepository {
	return DisciplinaRepository{connection: connection}
}

func (d *DisciplinaRepository) GetDisciplinas() ([]model.Disciplina, error) {
	query := "SELECT id, codigo, nome, descricao FROM disciplina ORDER BY id ASC"
	rows, err := d.connection.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var disciplinas []model.Disciplina
	for rows.Next() {
		var disciplina model.Disciplina
		err = rows.Scan(&disciplina.ID, &disciplina.Codigo, &disciplina.Nome, &disciplina.Descricao)
		if err != nil {
			return nil, err
		}
		disciplinas = append(disciplinas, disciplina)
	}

	return disciplinas, nil
}

func (d *DisciplinaRepository) CreateDisciplina(disciplina model.Disciplina) (int, error) {
	var id int
	query := `
		INSERT INTO disciplina (codigo, nome, descricao)
		VALUES ($1, $2, $3)
		RETURNING id
	`
	err := d.connection.QueryRow(query, disciplina.Codigo, disciplina.Nome, disciplina.Descricao).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func (d *DisciplinaRepository) GetDisciplinaByID(id int) (model.Disciplina, error) {
	var disciplina model.Disciplina
	query := "SELECT id, codigo, nome, descricao FROM disciplina WHERE id = $1"
	err := d.connection.QueryRow(query, id).Scan(
		&disciplina.ID, &disciplina.Codigo, &disciplina.Nome, &disciplina.Descricao,
	)
	if err == sql.ErrNoRows {
		return model.Disciplina{}, fmt.Errorf("disciplina com ID %d não encontrada", id)
	}
	if err != nil {
		return model.Disciplina{}, err
	}

	// Get provas
	provas, err := d.GetDisciplinaProvas(id)
	if err != nil {
		return model.Disciplina{}, err
	}
	disciplina.Provas = provas

	return disciplina, nil
}

func (d *DisciplinaRepository) UpdateDisciplina(disciplina model.Disciplina) error {
	query := `
		UPDATE disciplina 
		SET codigo = $1, nome = $2, descricao = $3
		WHERE id = $4
	`
	result, err := d.connection.Exec(query,
		disciplina.Codigo, disciplina.Nome, disciplina.Descricao, disciplina.ID,
	)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return fmt.Errorf("disciplina com ID %d não encontrada", disciplina.ID)
	}

	return nil
}

func (d *DisciplinaRepository) DeleteDisciplina(id int) error {
	query := "DELETE FROM disciplina WHERE id = $1"
	result, err := d.connection.Exec(query, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return fmt.Errorf("disciplina com ID %d não encontrada", id)
	}

	return nil
}

func (d *DisciplinaRepository) AddDisciplinaProva(disciplinaID int, nomeProva string, urlProva string) error {
	query := `
		INSERT INTO disciplina_provas (disciplina_id, nome_prova, url_prova)
		VALUES ($1, $2, $3)
	`
	_, err := d.connection.Exec(query, disciplinaID, nomeProva, urlProva)
	return err
}

func (d *DisciplinaRepository) GetDisciplinaProvas(disciplinaID int) ([]model.Prova, error) {
	query := `
		SELECT id, disciplina_id, nome_prova, url_prova 
		FROM disciplina_provas
		WHERE disciplina_id = $1
	`
	rows, err := d.connection.Query(query, disciplinaID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var provas []model.Prova
	s3Service, err := service.NewS3Service()
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var prova model.Prova
		var urlProva string
		if err := rows.Scan(&prova.ID, &prova.DisciplinaID, &prova.Nome, &urlProva); err != nil {
			return nil, err
		}

		// Extrair a chave da URL do S3
		key := strings.TrimPrefix(urlProva, fmt.Sprintf("https://%s.s3.amazonaws.com/", s3Service.Bucket))

		// Gerar URL assinada
		signedURL, err := s3Service.GetSignedURL(key)
		if err != nil {
			return nil, err
		}

		prova.URL = signedURL
		provas = append(provas, prova)
	}

	return provas, nil
}
