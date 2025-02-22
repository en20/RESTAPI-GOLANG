import { FaGraduationCap, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <FaGraduationCap size={24} className="text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                Leite Provas
              </span>
            </div>
            <p className="mt-4 text-gray-500 max-w-md">
              Plataforma colaborativa para compartilhamento de provas antigas do
              curso de Ciência da Computação da UFC.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Links Rápidos
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/"
                  className="text-base text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/disciplinas"
                  className="text-base text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Disciplinas
                </a>
              </li>
              <li>
                <a
                  href="/sobre"
                  className="text-base text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Sobre
                </a>
              </li>
            </ul>
          </div>

          {/* Links Externos */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Links Úteis
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://cc.ufc.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <FaGraduationCap size={16} />
                  Computação UFC
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/seu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <FaGithub size={16} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/seu-perfil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <FaLinkedin size={16} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Divisória com Gradiente */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} UFC Provas. Todos os direitos
              reservados.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a
                href="/privacidade"
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="/termos"
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
