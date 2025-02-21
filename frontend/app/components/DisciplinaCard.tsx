import Link from "next/link";
import { Disciplina } from "../types";
import { FaBook, FaFileAlt } from "react-icons/fa";

interface DisciplinaCardProps {
  disciplina: Disciplina;
}

export default function DisciplinaCard({ disciplina }: DisciplinaCardProps) {
  const numProvas = disciplina.provas?.length || 0;

  return (
    <Link
      href={`/disciplinas/${disciplina.id}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
            <FaBook className="text-blue-500 text-xl" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {disciplina.nome}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Código: {disciplina.codigo}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                <FaFileAlt className="text-blue-500 text-sm" />
                <span className="text-blue-600 text-sm font-medium">
                  {numProvas} {numProvas === 1 ? "prova" : "provas"}
                </span>
              </div>
            </div>
            <p className="mt-4 text-gray-600 line-clamp-2 text-sm">
              {disciplina.descricao}
            </p>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </Link>
  );
}
