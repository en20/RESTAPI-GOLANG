"use client";
import { useState } from "react";

interface FileUploadProps {
  disciplinaId: string;
  onUploadSuccess: () => void;
}

export default function FileUpload({
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
      setSelectedFile(files[0]);
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
        `http://localhost:8080/disciplina/${disciplinaId}/provas`,
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
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Nome da Prova</label>
        <input
          type="text"
          value={provaName}
          onChange={(e) => setProvaName(e.target.value)}
          placeholder="Ex: Prova 1 - 2023.1"
          className="w-full px-3 py-2 border rounded-md"
          disabled={uploading}
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Selecionar Arquivo</label>
        <input
          type="file"
          onChange={handleFileSelect}
          disabled={uploading}
          className="mt-1 block w-full text-sm text-gray-500
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
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
      >
        {uploading ? "Anexando..." : "Cadastrar Prova"}
      </button>

      {message && (
        <p
          className={`mt-2 ${
            uploading
              ? "text-blue-600"
              : message.includes("sucesso")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
