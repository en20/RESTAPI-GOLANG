package model

type Disciplina struct {
	ID        int     `json:"id"`
	Codigo    string  `json:"codigo"`
	Nome      string  `json:"nome"`
	Descricao string  `json:"descricao"`
	Semestre  int     `json:"semestre"`
	Provas    []Prova `json:"provas"`
}

type Prova struct {
	ID           int    `json:"id"`
	DisciplinaID int    `json:"disciplina_id"`
	Nome         string `json:"nome"`
	URL          string `json:"url"`
}
