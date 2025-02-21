-- Criação da tabela disciplina
CREATE TABLE IF NOT EXISTS disciplina (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);

-- Criação da tabela para as provas
CREATE TABLE IF NOT EXISTS prova (
    id SERIAL PRIMARY KEY,
    disciplina_id INTEGER REFERENCES disciplina(id),
    nome VARCHAR(255) NOT NULL,
    url TEXT NOT NULL
);

-- Inserindo disciplinas de exemplo
INSERT INTO disciplina (codigo, nome, descricao) VALUES 
    ('MAT101', 'Cálculo I', 'Introdução ao cálculo diferencial e integral'),
    ('FIS201', 'Física I', 'Mecânica clássica e cinemática'),
    ('PRG301', 'Programação I', 'Fundamentos de programação e algoritmos'); 