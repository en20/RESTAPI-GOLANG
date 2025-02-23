"use client";
import { useState } from "react";
import { Disciplina } from "../../types";
import FileUpload from "../../components/FileUpload";
import { API_URL } from "../../config";

export default function DisciplinaDetail({
  initialData,
}: {
  initialData: Disciplina;
}) {
  const [disciplina, setDisciplina] = useState<Disciplina>(initialData);
  const [error, setError] = useState<string | null>(null);

  const fetchDisciplina = async () => {
    try {
      console.log(
        "Atualizando dados da disciplina:",
        `${API_URL}/disciplina/${disciplina.id}`
      );
      const res = await fetch(`${API_URL}/disciplina/${disciplina.id}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log("Dados atualizados recebidos:", data);
      setDisciplina(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching disciplina:", err);
      setError(
        err instanceof Error ? err.message : "Erro ao carregar disciplina"
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ... resto do conteúdo do componente ... */}
    </div>
  );
}
