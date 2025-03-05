"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Disciplina } from "../../types";
import { API_URL } from "../../config";
import DisciplinaCard from "../../components/DisciplinaCard";
import LoadingPulse from "../../components/LoadingPulse";
import { getAuthToken } from "../../contexts/AuthContext";

export default function SemestrePage() {
  const params = useParams();
  const semestre = params.id;
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(
          `${API_URL}/disciplinas?semestre=${semestre}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setDisciplinas(data);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplinas();
  }, [semestre]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Disciplinas do {semestre}º Semestre
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <LoadingPulse key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disciplinas.map((disciplina) => (
              <DisciplinaCard key={disciplina.id} disciplina={disciplina} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
