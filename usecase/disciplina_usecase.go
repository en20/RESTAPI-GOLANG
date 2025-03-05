package usecase

import (
	"go-api/model"
	"go-api/repository"
)

type DisciplinaUsecase struct {
	repository repository.DisciplinaRepository
}

func NewDisciplinaUsecase(repo repository.DisciplinaRepository) DisciplinaUsecase {
	return DisciplinaUsecase{repository: repo}
}

func (d *DisciplinaUsecase) GetDisciplinas() ([]model.Disciplina, error) {
	return d.repository.GetDisciplinas()
}

func (d *DisciplinaUsecase) CreateDisciplina(disciplina model.Disciplina) (model.Disciplina, error) {
	id, err := d.repository.CreateDisciplina(disciplina)
	if err != nil {
		return model.Disciplina{}, err
	}
	disciplina.ID = id
	return disciplina, nil
}

func (d *DisciplinaUsecase) GetDisciplinaByID(id int) (model.Disciplina, error) {
	return d.repository.GetDisciplinaByID(id)
}

func (d *DisciplinaUsecase) UpdateDisciplina(disciplina model.Disciplina) error {
	return d.repository.UpdateDisciplina(disciplina)
}

func (d *DisciplinaUsecase) DeleteDisciplina(id int) error {
	return d.repository.DeleteDisciplina(id)
}

func (d *DisciplinaUsecase) AddDisciplinaProva(disciplinaID int, nomeProva string, urlProva string) error {
	return d.repository.AddDisciplinaProva(disciplinaID, nomeProva, urlProva)
}

func (d *DisciplinaUsecase) GetDisciplinaProvas(disciplinaID int) ([]model.Prova, error) {
	return d.repository.GetDisciplinaProvas(disciplinaID)
}

func (d *DisciplinaUsecase) GetAllProvas() ([]model.Prova, error) {
	return d.repository.GetAllProvas()
}

func (d *DisciplinaUsecase) DeleteProva(provaID int) error {
	return d.repository.DeleteProva(provaID)
}

func (d *DisciplinaUsecase) GetDisciplinasBySemestre(semestre int) ([]model.Disciplina, error) {
	return d.repository.GetDisciplinasBySemestre(semestre)
}
