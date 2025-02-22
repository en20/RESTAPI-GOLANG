CREATE TABLE disciplina (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    semestre INTEGER NOT NULL
);

CREATE TABLE disciplina_provas (
    id SERIAL PRIMARY KEY,
    disciplina_id INTEGER REFERENCES disciplina(id),
    nome_prova VARCHAR(255) NOT NULL,
    url_prova TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adicionando a coluna semestre à tabela disciplina
ALTER TABLE disciplina ADD COLUMN semestre INTEGER NOT NULL DEFAULT 1; 
