"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import { Disciplina, Prova } from "../../types";
import FileUpload from "../../components/FileUpload";
import ProvasList from "../../components/ProvasList";
import LoadingPulse from "../../components/LoadingPulse";
import SearchBar from "../../components/SearchBar";
import Modal from "../../components/Modal";
import { FaBook, FaCode, FaFileAlt, FaPlus } from "react-icons/fa";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filteredProvas =
    disciplina?.provas?.filter((prova) =>
      prova.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!disciplina) {
    return (
      <div className="container mx-auto p-4">
        <LoadingPulse />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <FaBook size={32} />
              <h1 className="text-4xl font-bold">{disciplina.nome}</h1>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <FaCode className="text-blue-200" />
              <p className="text-xl text-blue-100">
                Código: {disciplina.codigo}
              </p>
            </div>
            <p className="text-lg text-blue-100 max-w-2xl">
              {disciplina.descricao}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total de Provas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {disciplina.provas?.length || 0}
                  </p>
                </div>
                <FaFileAlt className="text-blue-500 text-2xl" />
              </div>
            </div>
            {/* Adicione mais cards de estatísticas se necessário */}
          </div>

          {/* Provas Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Provas Disponíveis
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <FaPlus size={16} className="mr-2" />
                  Adicionar Prova
                </button>
              </div>

              <div className="mb-6">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Buscar provas..."
                />
              </div>

              {disciplina.provas && disciplina.provas.length > 0 ? (
                <div className="mt-6">
                  <ProvasList provas={filteredProvas} />
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <FaFileAlt size={32} color="#9CA3AF" />
                  <p className="text-gray-500 mt-2">
                    Nenhuma prova disponível para esta disciplina ainda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar Nova Prova"
      >
        <FileUpload
          disciplinaId={id}
          onUploadSuccess={() => {
            fetchDisciplina();
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
