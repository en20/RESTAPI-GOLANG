"use client";
import { useEffect, useState } from "react";
import { Disciplina, Prova } from "../types";
import SearchBar from "../components/SearchBar";
import DisciplinaCard from "../components/DisciplinaCard";
import LoadingPulse from "../components/LoadingPulse";
import { FaSearch, FaGraduationCap } from "react-icons/fa";
import { API_URL } from "../config";
import ProtectedRoute from "../components/ProtectedRoute";
import { getAuthToken } from "../contexts/AuthContext";

export default function DisciplinasPage() {
  console.log("Todas as env vars:", process.env);
  console.log("API_URL específica:", process.env.NEXT_PUBLIC_API_URL);

  const [searchTerm, setSearchTerm] = useState("");
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/disciplinas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();

        // Para cada disciplina, buscar suas provas
        const disciplinasComProvas = await Promise.all(
          data.map(async (disciplina: Disciplina) => {
            const res = await fetch(`${API_URL}/disciplina/${disciplina.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const disciplinaCompleta = await res.json();
            disciplinaCompleta.provas =
              disciplinaCompleta.provas?.filter(
                (prova: Prova) => prova.url && prova.url.trim() !== ""
              ) || [];
            return disciplinaCompleta;
          })
        );

        setDisciplinas(disciplinasComProvas);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplinas();
  }, []);

  function normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-zA-Z0-9\s]/g, "") // Remove caracteres especiais
      .replace(/\s+/g, " ") // Normaliza espaços
      .trim();
  }

  // Adicione esta função de normalização de números
  function normalizeNumber(text: string): string {
    const romanToArabic: { [key: string]: string } = {
      i: "1",
      ii: "2",
      iii: "3",
      iv: "4",
      v: "5",
      vi: "6",
    };

    // Substitui números romanos por arábicos
    Object.entries(romanToArabic).forEach(([roman, arabic]) => {
      text = text.replace(new RegExp(`\\b${roman}\\b`, "g"), arabic);
    });

    return text;
  }

  const filteredDisciplinas = disciplinas.filter((disciplina) => {
    if (!searchTerm.trim()) return true;

    const searchNormalized = normalizeNumber(normalizeText(searchTerm));
    const nomeNormalized = normalizeNumber(normalizeText(disciplina.nome));
    const codigoNormalized = normalizeText(disciplina.codigo);

    // Adiciona variações comuns para melhorar a busca
    const textoCompleto = `${nomeNormalized} ${codigoNormalized} ${nomeNormalized.replace(
      "diferencial e integral",
      "calculo"
    )}`;

    const searchWords = searchNormalized
      .split(/\s+/)
      .filter((word) => word.length > 0);

    return searchWords.every((word) => textoCompleto.includes(word));
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <FaGraduationCap className="text-white text-5xl" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Disciplinas
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Encontre provas antigas das disciplinas do curso de Ciência da
                Computação.
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
    </ProtectedRoute>
  );
}
