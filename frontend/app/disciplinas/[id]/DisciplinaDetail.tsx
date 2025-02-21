"use client";
import { useState } from "react";
import { Disciplina } from "../../types";
import FileUpload from "../../components/FileUpload";

export default function DisciplinaDetail({
  initialData,
}: {
  initialData: Disciplina;
}) {
  const [disciplina, setDisciplina] = useState<Disciplina>(initialData);
  const [error, setError] = useState<string | null>(null);

  const fetchDisciplina = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/disciplina/${disciplina.id}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
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
