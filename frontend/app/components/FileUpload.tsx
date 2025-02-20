"use client";
import { useState } from "react";

interface FileUploadProps {
  productId: string;
  onUploadSuccess: () => void;
}

export default function FileUpload({
  productId,
  onUploadSuccess,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    setMessage("Anexando arquivo...");

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/product/${productId}/files`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Arquivo anexado com sucesso!");
        onUploadSuccess();
        event.target.value = ""; // Reset input
      } else {
        setMessage(`Falha ao anexar: ${data.error}`);
      }
    } catch (error) {
      setMessage("Erro ao anexar arquivo");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="block mb-2">
        <span className="text-gray-700">Anexar Arquivos</span>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          disabled={uploading}
          className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
        />
      </label>

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
    </div>
  );
}
