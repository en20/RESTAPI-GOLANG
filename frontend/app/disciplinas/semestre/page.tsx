"use client";
import { useEffect, useState } from "react";
import { Disciplina, Prova } from "../../types";
import DisciplinaCard from "../../components/DisciplinaCard";
import LoadingPulse from "../../components/LoadingPulse";
import { FaGraduationCap } from "react-icons/fa";
import { API_URL } from "../../config";
import AuthRequired from "../../components/AuthRequired";
import { useAuth } from "../../contexts/AuthContext";

export default function SemestrePage() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemestre, setSelectedSemestre] = useState<number>(1);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(
      "Fazendo fetch de disciplinas por semestre:",
      `${API_URL}/disciplinas`
    );
    fetch(`${API_URL}/disciplinas`)
      .then((res) => {
        console.log("Status da resposta:", res.status);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(async (data) => {
        console.log("Dados iniciais:", data);
        const disciplinasComProvas = await Promise.all(
          data.map(async (disciplina: Disciplina) => {
            console.log(`Buscando detalhes da disciplina ${disciplina.id}`);
            const res = await fetch(`${API_URL}/disciplina/${disciplina.id}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const disciplinaCompleta = await res.json();
            // Filtrar apenas provas válidas
            disciplinaCompleta.provas =
              disciplinaCompleta.provas?.filter(
                (prova: Prova) => prova.url && prova.url.trim() !== ""
              ) || [];
            return disciplinaCompleta;
          })
        );
        console.log("Todas as disciplinas carregadas:", disciplinasComProvas);
        setDisciplinas(disciplinasComProvas);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar disciplinas:", err);
        setLoading(false);
      });
  }, []);

  const semestresDisponiveis = Array.from(
    new Set(
      disciplinas.map((d) => {
        console.log("Disciplina sendo mapeada:", d);
        return d.semestre;
      })
    )
  ).sort((a, b) => a - b);

  console.log("Semestres disponíveis:", semestresDisponiveis);

  const disciplinasFiltradas = disciplinas.filter(
    (d) => d.semestre === selectedSemestre
  );

  return (
    <>
      <AuthRequired />
      {isAuthenticated && (
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <FaGraduationCap size={48} color="white" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Disciplinas por Semestre
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  Visualize as disciplinas organizadas por semestre
                </p>
              </div>
            </div>
          </div>

          {/* Semestre Selection */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Seleção de semestre"
              >
                {semestresDisponiveis.map((semestre) => (
                  <button
                    key={`semestre-${semestre}`}
                    onClick={() => setSelectedSemestre(semestre)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedSemestre === semestre
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    aria-pressed={selectedSemestre === semestre}
                  >
                    {semestre} º Semestre
                  </button>
                ))}
              </div>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {selectedSemestre}º Semestre
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {disciplinasFiltradas.map((disciplina) => (
                    <DisciplinaCard
                      key={disciplina.id}
                      disciplina={disciplina}
                    />
                  ))}
                </div>

                {disciplinasFiltradas.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">
                      Nenhuma disciplina encontrada para este semestre.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
