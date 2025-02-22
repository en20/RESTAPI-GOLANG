"use client";
import { FaGraduationCap, FaUsers, FaCode, FaGithub } from "react-icons/fa";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Sobre o Projeto
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Uma plataforma colaborativa para compartilhamento de conhecimento
              entre estudantes de Computação da UFC
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FaGraduationCap className="text-blue-600 text-2xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Objetivo</h2>
            </div>
            <p className="text-gray-600">
              Facilitar o acesso a provas antigas das disciplinas do curso de
              Ciência da Computação, ajudando os estudantes em sua preparação
              acadêmica.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Colaborativo
              </h2>
            </div>
            <p className="text-gray-600">
              Uma plataforma construída pela comunidade, onde todos os alunos
              podem contribuir compartilhando materiais de estudo.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FaCode className="text-blue-600 text-2xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Open Source
              </h2>
            </div>
            <p className="text-gray-600">
              Projeto de código aberto, desenvolvido com tecnologias modernas e
              contribuições da comunidade acadêmica.
            </p>
          </div>
        </div>

        {/* Como Contribuir Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Como Contribuir
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Existem várias formas de contribuir com o projeto:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Compartilhando provas antigas das disciplinas</li>
              <li>Reportando bugs e sugerindo melhorias</li>
              <li>Contribuindo com código no GitHub</li>
              <li>Divulgando a plataforma para outros estudantes</li>
            </ul>
          </div>
        </div>

        {/* GitHub Section */}
        <div className="text-center">
          <a
            href="https://github.com/seu-usuario/ufc-provas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <FaGithub className="text-xl" />
            <span>Ver no GitHub</span>
          </a>
          <p className="mt-4 text-gray-500">
            Contribua com o desenvolvimento do projeto
          </p>
        </div>
      </div>

      {/* Tecnologias Section */}
      <div className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Tecnologias Utilizadas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TechCard name="Next.js" description="Framework React" />
            <TechCard name="Go" description="Backend em Golang" />
            <TechCard name="PostgreSQL" description="Banco de Dados" />
            <TechCard name="Tailwind CSS" description="Estilização" />
          </div>
        </div>
      </div>
    </div>
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
