type DisciplinaUsecase interface {
	GetDisciplinasBySemestre(semestre int) ([]model.Disciplina, error)
	// ... outros métodos existentes
} 