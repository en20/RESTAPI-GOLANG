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
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden relative h-[200px]"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex-1">
          <div className="flex items-start gap-3 h-full">
            <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors shrink-0">
              <FaBook className="text-blue-500 text-xl" />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-3 h-[48px]">
                  <h2 className="text-[15px] leading-6 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex-1 line-clamp-2">
                    {disciplina.nome}
                  </h2>
                  <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-0.5 rounded-full shrink-0 h-[24px]">
                    <FaFileAlt className="text-blue-500 text-sm" />
                    <span className="text-blue-600 text-sm font-medium whitespace-nowrap">
                      {numProvas} {numProvas === 1 ? "prova" : "provas"}
                    </span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm text-gray-500">
                    Código: {disciplina.codigo}
                  </p>
                  <p className="text-sm text-blue-600">
                    {disciplina.semestre}º Semestre
                  </p>
                </div>
              </div>
              <p className="mt-2 text-gray-600 line-clamp-2 text-sm">
                {disciplina.descricao}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </div>
    </Link>
  );
}
