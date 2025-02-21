"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import { Disciplina } from "../../types";
import FileUpload from "../../components/FileUpload";

export default function DisciplinaDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [disciplina, setDisciplina] = useState<Disciplina | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    descricao: "",
  });

  const fetchDisciplina = async () => {
    try {
      const res = await fetch(`http://localhost:8080/disciplina/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      const data = await res.json();
      if (!data) {
        throw new Error("No data received");
      }
      setDisciplina(data);
      setFormData({
        codigo: data.codigo || "",
        nome: data.nome || "",
        descricao: data.descricao || "",
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching disciplina:", err);
      setError(
        err instanceof Error ? err.message : "Erro ao carregar disciplina"
      );
    }
  };

  useEffect(() => {
    fetchDisciplina();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/disciplina/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEditing(false);
      await fetchDisciplina();
    } catch (error) {
      console.error("Error updating disciplina:", error);
      setError(
        error instanceof Error ? error.message : "Erro ao atualizar disciplina"
      );
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!disciplina) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Código
              </label>
              <input
                type="text"
                value={formData.codigo}
                onChange={(e) =>
                  setFormData({ ...formData, codigo: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                rows={4}
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{disciplina.nome}</h1>
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Editar
              </button>
            </div>
            <p className="text-xl text-gray-600 mb-2">
              Código: {disciplina.codigo}
            </p>
            <p className="text-gray-600 mb-8">{disciplina.descricao}</p>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Provas</h2>
              <FileUpload disciplinaId={id} onUploadSuccess={fetchDisciplina} />

              {disciplina.provas && disciplina.provas.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Provas Anexadas:</h3>
                  <ul className="list-none pl-0">
                    {disciplina.provas.map((prova) => (
                      <li
                        key={prova.id}
                        className="mb-3 flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-gray-700">{prova.nome}</span>
                        <a
                          href={prova.url}
                          download
                          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          Download
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
