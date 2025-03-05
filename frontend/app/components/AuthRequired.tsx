"use client";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import { FaLock, FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function AuthRequired() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaLock className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Acesso Restrito
            </h2>
            <p className="text-gray-600 mb-8">
              Para acessar este conteúdo, você precisa estar logado na
              plataforma.
            </p>
            <div className="space-y-4">
              <Link
                href="/login"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaSignInAlt className="mr-2" /> Fazer Login
              </Link>
              <Link
                href="/register"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaUserPlus className="mr-2" /> Criar Conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
