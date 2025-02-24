"use client";
import {
  FaGraduationCap,
  FaUsers,
  FaCode,
  FaGithub,
  FaLightbulb,
  FaHandshake,
  FaRocket,
} from "react-icons/fa";
import { IconContext } from "react-icons";

export default function SobrePage() {
  return (
    <IconContext.Provider value={{ className: "icon" }}>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                Sobre o Leite Provas
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
                Uma iniciativa dos alunos para alunos, criando um ambiente
                colaborativo de compartilhamento de conhecimento e preparação
                acadêmica na Universidade Federal do Ceará.
              </p>
              <p className="text-xs text-blue-100 max-w-3xl mx-auto italic">
                Inspirado no lendário Drive do Leite, trazemos uma versão
                moderna e aprimorada para compartilhar provas e materiais de
                estudo. Uma plataforma estruturada, organizada e de fácil acesso
                para todos os estudantes.
              </p>
            </div>
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FaRocket style={{ color: "#2563EB", fontSize: "1.5rem" }} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Nossa Missão
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Democratizar o acesso ao material de estudo e fortalecer a
                preparação acadêmica dos estudantes de Computação da UFC,
                criando um ambiente inclusivo onde o conhecimento flui
                livremente entre a comunidade estudantil.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FaLightbulb
                    style={{ color: "#2563EB", fontSize: "1.5rem" }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Nossa Visão
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Ser a principal referência de preparação acadêmica para os
                estudantes de Computação da UFC, promovendo a colaboração e o
                compartilhamento de conhecimento como pilares fundamentais do
                sucesso acadêmico.
              </p>
            </div>
          </div>

          {/* Pilares Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FaGraduationCap
                    style={{ color: "#2563EB", fontSize: "1.5rem" }}
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Excelência Acadêmica
                </h2>
              </div>
              <p className="text-gray-600">
                Facilitamos o acesso a provas antigas, materiais de estudo e
                recursos acadêmicos de qualidade, contribuindo para uma melhor
                preparação dos estudantes em todas as disciplinas do curso.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FaUsers style={{ color: "#2563EB", fontSize: "1.5rem" }} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Comunidade Colaborativa
                </h2>
              </div>
              <p className="text-gray-600">
                Construímos uma plataforma baseada na colaboração entre alunos,
                onde cada contribuição enriquece o acervo coletivo e fortalece
                nossa comunidade acadêmica.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FaCode style={{ color: "#2563EB", fontSize: "1.5rem" }} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Inovação Tecnológica
                </h2>
              </div>
              <p className="text-gray-600">
                Desenvolvemos uma plataforma moderna e de código aberto,
                utilizando as melhores práticas e tecnologias atuais para
                proporcionar uma experiência excepcional aos usuários.
              </p>
            </div>
          </div>

          {/* Benefícios Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Benefícios para os Estudantes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Para quem estuda:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>
                    Acesso a provas antigas organizadas por disciplina e
                    semestre
                  </li>
                  <li>Melhor preparação para avaliações</li>
                  <li>Compreensão do estilo de questões de cada disciplina</li>
                  <li>Otimização do tempo de estudo</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Para quem contribui:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Reconhecimento na comunidade acadêmica</li>
                  <li>Experiência com desenvolvimento de software</li>
                  <li>Participação em um projeto de impacto social</li>
                  <li>Networking com outros estudantes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Como Contribuir Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FaHandshake style={{ color: "#2563EB", fontSize: "1.5rem" }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Como Contribuir
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600">
                Sua contribuição é fundamental para o crescimento e sucesso
                desta iniciativa. Existem várias formas de participar:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Compartilhando Conteúdo:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>Provas antigas das disciplinas</li>
                    <li>Listas de exercícios resolvidos</li>
                    <li>Materiais complementares</li>
                    <li>Dicas de estudo</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Desenvolvimento:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>Reportando bugs e sugestões</li>
                    <li>Contribuindo com código no GitHub</li>
                    <li>Melhorando a documentação</li>
                    <li>Divulgando a plataforma</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Section */}
          <div className="text-center">
            <a
              href="https://github.com/seu-usuario/ufc-provas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <FaGithub className="text-white text-xl" />
              <span className="text-lg">Contribua no GitHub</span>
            </a>
            <p className="mt-4 text-gray-500">
              Junte-se a nós no desenvolvimento desta plataforma
            </p>
          </div>
        </div>

        {/* Tecnologias Section */}
        <div className="bg-white border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Stack Tecnológica
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <TechCard
                name="Next.js"
                description="Framework React moderno para frontend"
              />
              <TechCard
                name="Go"
                description="Backend robusto e performático"
              />
              <TechCard
                name="PostgreSQL"
                description="Banco de dados relacional"
              />
              <TechCard
                name="Tailwind CSS"
                description="Framework CSS utility-first"
              />
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

function TechCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="text-center p-4">
      <h3 className="font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
