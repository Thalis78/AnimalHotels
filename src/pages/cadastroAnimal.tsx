import { useState, useEffect } from "react";
import { Toast } from "../ui/toast";
import { useNavigate } from "react-router-dom";

export default function CadastroAnimal() {
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [tutor, setTutor] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVariant, setToastVariant] = useState<"success" | "error">(
    "success"
  );
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const idTutor = localStorage.getItem("id");

    if (!idTutor) {
      navigate("/login");
    } else {
      setTutor(idTutor);
    }
  }, [navigate]);

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!tutor) {
      setToastMessage("Erro: Tutor não identificado.");
      setToastVariant("error");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/animal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          especie,
          raca,
          idade: Number(idade),
          tutor: Number(tutor),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setToastMessage(data.error || "Erro ao cadastrar animal");
        setToastVariant("error");
      } else {
        setToastMessage("Cadastro realizado com sucesso!");
        setToastVariant("success");

        setTimeout(() => navigate("/animais"), 2000);
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      setToastMessage("Erro ao tentar realizar o cadastro.");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Cadastro de Animal
        </h1>
        <form onSubmit={handleCadastro}>
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Nome do animal"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="especie"
              className="block text-sm font-medium text-gray-700"
            >
              Espécie:
            </label>
            <input
              type="text"
              id="especie"
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
              required
              placeholder="Ex: Cachorro, Gato"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="raca"
              className="block text-sm font-medium text-gray-700"
            >
              Raça:
            </label>
            <input
              type="text"
              id="raca"
              value={raca}
              onChange={(e) => setRaca(e.target.value)}
              required
              placeholder="Ex: Labrador, Persa"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="idade"
              className="block text-sm font-medium text-gray-700"
            >
              Idade:
            </label>
            <input
              type="number"
              id="idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
              placeholder="Idade do animal (em anos)"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 text-white font-semibold rounded-md focus:outline-none focus:ring-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
            }`}
          >
            {isLoading ? "Carregando..." : "Cadastrar"}
          </button>
        </form>
      </div>

      <Toast
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
