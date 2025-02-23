"use client";
import { useEffect, useState } from "react";
import { Disciplina } from "../types";
import SearchBar from "../components/SearchBar";
import DisciplinaCard from "../components/DisciplinaCard";
import LoadingPulse from "../components/LoadingPulse";
import { FaSearch, FaGraduationCap } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function DisciplinasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fazendo fetch de:", `${API_URL}/disciplinas`);
    fetch(`${API_URL}/disciplinas`)
      .then((res) => {
        console.log("Status da resposta:", res.status);
        return res.json();
      })
      .then(async (data) => {
        console.log("Dados recebidos:", data);
        // Para cada disciplina, buscar suas provas
        const disciplinasComProvas = await Promise.all(
          data.map(async (disciplina: Disciplina) => {
            const res = await fetch(`${API_URL}/disciplina/${disciplina.id}`);
            const disciplinaCompleta = await res.json();
            return disciplinaCompleta;
          })
        );
        setDisciplinas(disciplinasComProvas);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro completo:", err);
        setLoading(false);
      });
  }, []);

  const filteredDisciplinas = disciplinas.filter(
    (disciplina) =>
      disciplina.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disciplina.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <FaGraduationCap className="text-white text-5xl" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Disciplinas</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Encontre provas antigas das disciplinas do curso de Ciência da
              Computação
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por nome ou código da disciplina..."
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <LoadingPulse key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDisciplinas.map((disciplina) => (
                <DisciplinaCard key={disciplina.id} disciplina={disciplina} />
              ))}
            </div>

            {filteredDisciplinas.length === 0 && (
              <div className="text-center py-16">
                <FaSearch className="mx-auto text-gray-400 text-4xl mb-4" />
                <p className="text-gray-500 text-lg">
                  Nenhuma disciplina encontrada com os critérios de busca.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
