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

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

-- Após a criação da tabela users, adicione:
INSERT INTO users (name, email, password, role, created_at, updated_at) 
VALUES (
    'Admin',
    'admin@admin.com',
    '$2a$14$C1DIYDsmE0QHjje4wR5uwOYgpnM8ykE4xScZ.knB.sFsWcRrPKhLK', -- senha: admin123
    'admin',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING; 
