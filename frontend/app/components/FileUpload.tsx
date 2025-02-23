"use client";
import { useState } from "react";

interface FileUploadProps {
  productId?: string;
  disciplinaId?: string;
  onUploadSuccess: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function FileUpload({
  productId,
  disciplinaId,
  onUploadSuccess,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [provaName, setProvaName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      if (file.type !== "application/pdf") {
        setMessage("Por favor, selecione apenas arquivos PDF");
        setSelectedFile(null);
        event.target.value = ""; // Limpa o input
        return;
      }
      setSelectedFile(file);
      setMessage(""); // Limpa mensagens anteriores
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !provaName.trim()) {
      setMessage("Por favor, preencha o nome da prova e selecione um arquivo");
      return;
    }

    setUploading(true);
    setMessage("Anexando prova...");

    const formData = new FormData();
    formData.append("name", provaName);
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `${API_URL}/disciplina/${disciplinaId}/provas`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Prova anexada com sucesso!");
        setProvaName("");
        setSelectedFile(null);
        onUploadSuccess();
        // Reset file input
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setMessage(`Falha ao anexar: ${data.error}`);
      }
    } catch (error) {
      setMessage("Erro ao anexar prova");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Nome da Prova
        </label>
        <input
          type="text"
          value={provaName}
          onChange={(e) => setProvaName(e.target.value)}
          placeholder="Ex: Prova 1 - 2023.1"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={uploading}
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Arquivo da Prova
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Somente arquivos PDF são aceitos
        </p>
        <input
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,application/pdf"
          disabled={uploading}
          className="w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={uploading || !selectedFile || !provaName.trim()}
        className={`w-full py-2 px-4 rounded-md text-white font-medium
          ${
            uploading || !selectedFile || !provaName.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
      >
        {uploading ? "Enviando..." : "Enviar Prova"}
      </button>

      {message && (
        <p
          className={`text-sm ${
            message.includes("sucesso")
              ? "text-green-600"
              : message.includes("anexando")
              ? "text-blue-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
