import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("id");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  };

  const isProfilePageAllowed = !["/login", "/cadastro-tutor"].includes(
    location.pathname
  );
  const isAnimalsPageAllowed = ![
    "/login",
    "/cadastro-tutor",
    "/animais",
  ].includes(location.pathname);

  return (
    <header className="w-full bg-gray-900 text-gray-300 shadow-md py-4 px-6 flex items-center justify-between relative">
      <h1 className="text-2xl font-bold">Animals Pets</h1>

      <div className="flex space-x-4">
        {isAnimalsPageAllowed && (
          <Link
            to="/animais"
            className="px-4 py-2 bg-gray-700 text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-200 focus:outline-none"
          >
            Animais
          </Link>
        )}

        {isProfilePageAllowed && userId && (
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex items-center px-4 py-2 bg-gray-700 text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-200 focus:outline-none"
            >
              Perfil
              <svg
                className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-gray-200 shadow-lg rounded-lg border border-gray-700 z-50">
                <Link
                  to={`/editar-tutor/${userId}`}
                  className="block px-4 py-2 hover:bg-gray-700 transition duration-200"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-red-700/50 text-red-400 transition duration-200"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
