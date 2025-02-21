import { Prova } from "../types";
import DownloadButton from "./DownloadButton";

interface ProvasListProps {
  provas: Prova[];
}

export default function ProvasList({ provas }: ProvasListProps) {
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
