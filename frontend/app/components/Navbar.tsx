"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaGraduationCap, FaBook, FaInfoCircle, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevenir scroll quando o menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <IconContext.Provider value={{ className: "icon" }}>
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <FaGraduationCap size={24} style={{ color: "#2563EB" }} />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                  Leite Provas
                </span>
              </Link>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-4">
                <Link
                  href="/"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <FaGraduationCap
                    size={16}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Home
                </Link>
                <Link
                  href="/disciplinas"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/disciplinas")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <FaBook size={16} style={{ marginRight: "0.5rem" }} />
                  Disciplinas
                </Link>
                <Link
                  href="/disciplinas/semestre"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/disciplinas/semestre")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <FaGraduationCap
                    size={16}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Por Semestre
                </Link>
                <Link
                  href="/sobre"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/sobre")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <FaInfoCircle size={16} style={{ marginRight: "0.5rem" }} />
                  Sobre
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Abrir menu</span>
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          {/* Overlay escuro com fade */}
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
              isOpen ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setIsOpen(false)}
          />

          {/* Menu drawer com slide */}
          <div
            className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 px-4 py-2 overflow-y-auto">
                <Link
                  href="/"
                  className={`flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive("/")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaGraduationCap
                    size={20}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Home
                </Link>
                <Link
                  href="/disciplinas"
                  className={`flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive("/disciplinas")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaBook size={20} style={{ marginRight: "0.5rem" }} />
                  Disciplinas
                </Link>
                <Link
                  href="/disciplinas/semestre"
                  className={`flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive("/disciplinas/semestre")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaGraduationCap
                    size={20}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Por Semestre
                </Link>
                <Link
                  href="/sobre"
                  className={`flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive("/sobre")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaInfoCircle size={20} style={{ marginRight: "0.5rem" }} />
                  Sobre
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </IconContext.Provider>
  );
}
