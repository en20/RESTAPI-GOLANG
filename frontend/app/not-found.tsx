"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome, FaRedo } from "react-icons/fa";

export default function NotFound() {
  const [counter, setCounter] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const characters = "!@#$%¨&*()_+1234567890";
      if (counter < 10) {
        setGlitchText(
          Array(3)
            .fill(0)
            .map(
              () => characters[Math.floor(Math.random() * characters.length)]
            )
            .join("")
        );
      } else {
        setGlitchText("404");
      }
    }, 100);

    return () => clearInterval(glitchInterval);
  }, [counter]);

  const handleClick = () => {
    setCounter((prev) => prev + 1);
    if (counter === 9) {
      setShowEasterEgg(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        {/* Glitch Effect */}
        <h1
          className="text-8xl font-mono font-bold mb-8 relative cursor-pointer select-none"
          onClick={handleClick}
          style={{
            color: showEasterEgg ? "#00ff00" : "white",
            textShadow: showEasterEgg
              ? "2px 2px #0f0, -2px -2px #0f0, 2px -2px #0f0, -2px 2px #0f0"
              : "2px 2px #ff0000, -2px -2px #0000ff",
          }}
        >
          <span className="relative">
            <span className="absolute top-0 left-0 -ml-2 text-red-500 opacity-70 animate-glitch1">
              {glitchText}
            </span>
            {glitchText}
            <span className="absolute top-0 left-0 ml-2 text-blue-500 opacity-70 animate-glitch2">
              {glitchText}
            </span>
          </span>
        </h1>

        {/* Main Message */}
        <div className="space-y-4 mb-8">
          <p className="text-xl text-gray-400 mb-2">
            {showEasterEgg ? (
              <span className="text-green-400 font-mono">
                {">> Segmentation fault (core dumped)"}
              </span>
            ) : (
              "Página não encontrada"
            )}
          </p>
          <p className="text-gray-500 max-w-md mx-auto">
            {showEasterEgg ? (
              <span className="text-green-400 font-mono text-sm">
                {">> Debug: Memory access violation at 0x00000000"}
              </span>
            ) : (
              "O endereço que você tentou acessar pode ter sido movido, deletado ou nunca existiu."
            )}
          </p>
        </div>

        {/* Terminal Effect */}
        {showEasterEgg && (
          <div className="bg-black p-4 rounded-lg mb-8 max-w-md mx-auto">
            <p className="text-green-400 font-mono text-left text-sm">
              <span className="text-blue-400">root@leite-provas</span>:
              <span className="text-purple-400">~</span>$ gdb ./page{"\n"}
              <span className="text-red-400">
                Program terminated with signal SIGSEGV
              </span>
              {"\n"}
              <span className="text-yellow-400">Stack trace available...</span>
              {"\n"}
              <span className="text-yellow-400">
                PARABÉNS VC ACHOU UM EASTER EGG
              </span>
              <span className="animate-pulse">█</span>
              {"\n"}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              showEasterEgg
                ? "bg-green-600 hover:bg-green-700 text-black font-mono"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <FaHome />
            <span>Voltar ao Início</span>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              showEasterEgg
                ? "bg-green-600 hover:bg-green-700 text-black font-mono"
                : "bg-gray-600 hover:bg-gray-700 text-white"
            }`}
          >
            <FaRedo />
            <span>Tentar Novamente</span>
          </button>
        </div>

        {/* Easter Egg Counter */}
        {counter > 0 && counter < 10 && (
          <p className="mt-8 text-gray-600 text-sm">
            Cliques no 404: {counter}/10
          </p>
        )}
      </div>
    </div>
  );
}
