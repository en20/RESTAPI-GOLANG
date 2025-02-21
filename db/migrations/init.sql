CREATE TABLE disciplina (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);

CREATE TABLE disciplina_provas (
    id SERIAL PRIMARY KEY,
    disciplina_id INTEGER REFERENCES disciplina(id),
    nome_prova VARCHAR(255) NOT NULL,
    url_prova TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 