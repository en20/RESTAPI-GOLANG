import { Prova } from "../types";
import DownloadButton from "./DownloadButton";
import { API_URL } from "../config";

interface ProvasListProps {
  provas: Prova[];
}

export default function ProvasList({ provas }: ProvasListProps) {
  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(
        `${API_URL}/download/prova?key=${encodeURIComponent(url)}`
      );
      // ... resto do código de download
    } catch (error) {
      console.error("Erro ao baixar prova:", error);
    }
  };

  return (
    <ul className="list-none pl-0">
      {provas.map((prova) => (
        <li
          key={prova.id}
          className="mb-3 flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <span className="text-gray-700">{prova.nome}</span>
          <DownloadButton url={prova.url} />
        </li>
      ))}
    </ul>
  );
}
