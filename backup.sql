--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Debian 12.22-1.pgdg120+1)
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg22.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: disciplina; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disciplina (
    id integer NOT NULL,
    codigo character varying(20) NOT NULL,
    nome character varying(255) NOT NULL,
    descricao text,
    semestre integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.disciplina OWNER TO postgres;

--
-- Name: disciplina_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disciplina_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.disciplina_id_seq OWNER TO postgres;

--
-- Name: disciplina_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disciplina_id_seq OWNED BY public.disciplina.id;


--
-- Name: disciplina_provas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disciplina_provas (
    id integer NOT NULL,
    disciplina_id integer,
    nome_prova character varying(255) NOT NULL,
    url_prova text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.disciplina_provas OWNER TO postgres;

--
-- Name: disciplina_provas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disciplina_provas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.disciplina_provas_id_seq OWNER TO postgres;

--
-- Name: disciplina_provas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disciplina_provas_id_seq OWNED BY public.disciplina_provas.id;


--
-- Name: disciplina id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplina ALTER COLUMN id SET DEFAULT nextval('public.disciplina_id_seq'::regclass);


--
-- Name: disciplina_provas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplina_provas ALTER COLUMN id SET DEFAULT nextval('public.disciplina_provas_id_seq'::regclass);


--
-- Data for Name: disciplina; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disciplina (id, codigo, nome, descricao, semestre) FROM stdin;
36	CB0534	CÁLCULO DIFERENCIAL E INTEGRAL I	Introdução ao cálculo, incluindo limites, derivadas e integrais de funções de uma variável real. Fundamentos essenciais para a compreensão matemática em computação.	1
37	CB0661	MATEMÁTICA DISCRETA	Estudo de estruturas matemáticas discretas, lógica, teoria dos conjuntos, relações, funções, indução matemática e teoria dos números. Base fundamental para ciência da computação.	1
38	CK0169	CIRCUITOS DIGITAIS	Fundamentos de sistemas digitais, álgebra booleana, portas lógicas, circuitos combinacionais e sequenciais. Introdução à arquitetura básica de computadores.	1
39	CK0211	FUNDAMENTOS DE PROGRAMAÇÃO	Introdução aos conceitos básicos de programação, algoritmos, tipos de dados, estruturas de controle e funções. Primeira experiência com desenvolvimento de software.	1
40	CK0253	SEMINÁRIOS EM COMPUTAÇÃO	Apresentação e discussão de temas atuais em computação, preparando os alunos para a realidade profissional e acadêmica da área.	1
41	CB0535	CÁLCULO DIFERENCIAL E INTEGRAL II	Continuação do Cálculo I, abordando integrais múltiplas, séries, sequências e cálculo vetorial. Aplicações em problemas computacionais.	2
42	CB0589	ÁLGEBRA LINEAR	Estudo de matrizes, sistemas lineares, espaços vetoriais e transformações lineares. Fundamental para computação gráfica e machine learning.	2
43	CK0170	TRANSMISSAO DE DADOS	Princípios de comunicação de dados, protocolos, modulação e técnicas de transmissão. Base para entendimento de redes de computadores.	2
44	CK0209	ESTRUTURAS DE DADOS	Estudo de estruturas de dados fundamentais como listas, pilhas, filas, árvores e grafos. Análise de algoritmos e complexidade computacional.	2
45	CK0226	PROGRAMAÇÃO	Aprofundamento em técnicas de programação, incluindo orientação a objetos, tratamento de exceções e interfaces gráficas.	2
46	CC0261	INTRODUÇÃO A PROBABILIDADE E A ESTATÍSTICA	Conceitos fundamentais de probabilidade e estatística, incluindo distribuições, estimação e testes de hipóteses. Aplicações em análise de dados.	3
47	CK0111	ALGORITMOS EM GRAFOS	Teoria dos grafos e seus algoritmos, incluindo busca, caminhos mínimos, árvores geradoras e fluxos em redes.	3
48	CK0195	ARQUITETURA DE COMPUTADORES	Organização e arquitetura de computadores, conjunto de instruções, pipeline, hierarquia de memória e entrada/saída.	3
49	CK0220	LÓGICA PARA CIÊNCIA DA COMPUTAÇÃO	Lógica proposicional e de predicados, métodos de prova e sua aplicação na verificação de programas.	3
50	CK0235	TÉCNICAS DE PROGRAMAÇÃO I	Técnicas avançadas de programação, padrões de projeto, desenvolvimento de software em camadas e boas práticas.	3
51	CK0047	MÉTODOS NUMÉRICOS I	Métodos computacionais para resolução de problemas matemáticos, incluindo equações não-lineares e sistemas lineares.	4
52	CK0114	FUNDAMENTOS DE BANCOS DE DADOS	Conceitos fundamentais de banco de dados, modelo relacional, normalização e linguagem SQL.	4
53	CK0115	LINGUAGENS DE PROGRAMAÇÃO I	Estudo comparativo de diferentes paradigmas de programação e suas características principais.	4
54	CK0203	CONSTRUÇÃO E ANÁLISE DE ALGORITMOS	Técnicas de projeto e análise de algoritmos, complexidade computacional e otimização.	4
55	CK0245	COMPUTAÇÃO GRÁFICA I	Fundamentos de computação gráfica, transformações geométricas, renderização e processamento de imagens.	4
56	CK0048	MÉTODOS NUMÉRICOS II	Continuação de Métodos Numéricos I, abordando interpolação, integração numérica e equações diferenciais.	5
57	CK0117	SISTEMAS DE GERENCIAMENTO DE BANCOS DE DADOS	Arquitetura de SGBDs, processamento de consultas, controle de concorrência e recuperação de falhas.	5
58	CK0247	ENGENHARIA DE SOFTWARE I	Processo de desenvolvimento de software, requisitos, projeto, implementação, testes e manutenção.	5
59	CK0249	REDES DE COMPUTADORES I	Arquitetura de redes, protocolos de comunicação, modelo OSI e TCP/IP, roteamento e segurança.	5
60	CK0118	AUTOMATOS E LINGUAGENS FORMAIS	Teoria de autômatos, linguagens regulares e livres de contexto, máquinas de Turing e computabilidade.	6
61	CK0192	ANÁLISE E PROJETO DE SISTEMAS I	Metodologias e ferramentas para análise e projeto de sistemas de software, incluindo UML e padrões de projeto.	6
62	CK0234	SISTEMAS OPERACIONAIS	Conceitos e implementação de sistemas operacionais, processos, threads, gerenciamento de memória e sistemas de arquivos.	6
63	CK0248	INTELIGÊNCIA ARTIFICIAL	Fundamentos de IA, busca, representação do conhecimento, aprendizado de máquina e processamento de linguagem natural.	6
64	CK0101	TEORIA DA COMPUTAÇÃO	Estudo da computabilidade, decidibilidade, complexidade computacional e limites da computação.	7
65	CK0202	CONSTRUÇÃO DE COMPILADORES	Teoria e implementação de compiladores, análise léxica, sintática e semântica, geração de código.	7
66	CK0212	INFORMÁTICA E SOCIEDADE	Impactos sociais, éticos e profissionais da computação na sociedade contemporânea.	7
\.


--
-- Data for Name: disciplina_provas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disciplina_provas (id, disciplina_id, nome_prova, url_prova, created_at) FROM stdin;
6	36	AP1 2022	https://leite-files.s3.amazonaws.com/products/36/Black And White Simple Personal Business Card (6).pdf	2025-02-22 19:38:50.791993
7	37	AP3 2019	https://leite-files.s3.amazonaws.com/products/37/Black And White Simple Personal Business Card (6).pdf	2025-02-22 21:47:07.781418
8	38	teste ap1	https://leite-files.s3.amazonaws.com/products/38/Black And White Simple Personal Business Card (6).pdf	2025-02-22 22:24:00.044702
\.


--
-- Name: disciplina_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disciplina_id_seq', 66, true);


--
-- Name: disciplina_provas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disciplina_provas_id_seq', 8, true);


--
-- Name: disciplina disciplina_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplina
    ADD CONSTRAINT disciplina_pkey PRIMARY KEY (id);


--
-- Name: disciplina_provas disciplina_provas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplina_provas
    ADD CONSTRAINT disciplina_provas_pkey PRIMARY KEY (id);


--
-- Name: disciplina_provas disciplina_provas_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplina_provas
    ADD CONSTRAINT disciplina_provas_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplina(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

