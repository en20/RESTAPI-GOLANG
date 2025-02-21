"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Disciplina } from "../types";

export default function DisciplinaList() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/disciplinas")
      .then((res) => res.json())
      .then((data) => setDisciplinas(data))
      .catch((err) => console.error("Error fetching disciplinas:", err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Disciplinas</h1>
        <Link
          href="/disciplinas/nova"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nova Disciplina
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {disciplinas.map((disciplina) => (
          <Link
            href={`/disciplinas/${disciplina.id}`}
            key={disciplina.id}
            className="block"
          >
            <div className="border p-4 rounded hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{disciplina.nome}</h2>
              <p className="text-gray-600">Código: {disciplina.codigo}</p>
              <p className="text-gray-500 mt-2 line-clamp-2">
                {disciplina.descricao}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
