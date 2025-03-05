"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  FaGraduationCap,
  FaBook,
  FaInfoCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

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
    <IconContext.Provider value={{ className: "inline-block" }}>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                  <FaGraduationCap className="inline-block mr-2" />
                  Portal Acadêmico
                </Link>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/disciplinas"
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive("/disciplinas")
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      <FaBook className="mr-1" /> Disciplinas
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/sobre"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive("/sobre")
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    <FaInfoCircle className="mr-1" /> Sobre
                  </Link>
                )}
              </div>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    <FaUser className="mr-1" />
                    {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaSignOutAlt className="mr-1" />
                    Sair
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Registrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </IconContext.Provider>
  );
}
