"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaGraduationCap,
  FaBook,
  FaInfoCircle,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaCalendarAlt,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };

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
                {isAuthenticated && (
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
                    <Link
                      href="/disciplinas/semestre"
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive("/disciplinas/semestre")
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      <FaCalendarAlt className="mr-1" /> Semestre
                    </Link>
                  </>
                )}
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

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <FaBars className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile menu drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 ">
            <button
              onClick={() => setIsOpen(false)}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated && (
              <>
                <Link
                  href="/disciplinas"
                  onClick={handleNavigation}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive("/disciplinas")
                      ? "border-blue-500 text-blue-700 bg-blue-50"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <FaBook className="mr-1" /> Disciplinas
                </Link>
                <Link
                  href="/disciplinas/semestre"
                  onClick={handleNavigation}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive("/disciplinas/semestre")
                      ? "border-blue-500 text-blue-700 bg-blue-50"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <FaCalendarAlt className="mr-1" /> Semestre
                </Link>
              </>
            )}
            <Link
              href="/sobre"
              onClick={handleNavigation}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive("/sobre")
                  ? "border-blue-500 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <FaInfoCircle className="mr-1" /> Sobre
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleNavigation();
                  logout();
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                <FaSignOutAlt className="mr-1" /> Sair
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={handleNavigation}
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={handleNavigation}
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  Registrar
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </IconContext.Provider>
  );
}
