"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Disciplina } from "./types";
import { FaSearch, FaCloudUploadAlt, FaGraduationCap } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Compartilhe e Encontre Provas da UFC
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Plataforma colaborativa para estudantes de Ciência da Computação
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/disciplinas"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Buscar Provas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaSearch size={48} color="#3B82F6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Encontre Facilmente
              </h3>
              <p className="text-gray-600">
                Busque provas por disciplina e semestre. Organize seus estudos
                de forma eficiente.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaCloudUploadAlt size={48} color="#3B82F6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Compartilhe Provas</h3>
              <p className="text-gray-600">
                Contribua com a comunidade fazendo upload de provas antigas.
                Ajude outros estudantes.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaGraduationCap size={48} color="#3B82F6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Prepare-se Melhor</h3>
              <p className="text-gray-600">
                Estude com provas anteriores e aumente suas chances de sucesso
                nas avaliações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Nossa Comunidade em Números
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-gray-600">Disciplinas Cadastradas</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Provas Disponíveis</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Downloads Realizados</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
