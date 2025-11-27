import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-gray-900 text-gray-300 shadow-md py-4 px-6 flex items-center justify-between relative">
      <h1 className="text-2xl font-bold">Animals Pets</h1>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="font-semibold hover:text-white transition"
        >
          Perfil
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-gray-800 text-gray-200 shadow-lg rounded-lg border border-gray-700">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 transition">
              Editar
            </button>

            <button className="w-full text-left px-4 py-2 hover:bg-red-900/40 text-red-400 transition">
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
