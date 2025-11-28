import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toast } from "../ui/toast";
import Spinner from "../ui/spinner";

export default function EditarPerfil() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVariant, setToastVariant] = useState<"success" | "error">(
    "success"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutorData = async () => {
      setIsLoadingData(true);
      try {
        const response = await fetch(`/api/tutor?id=${id}`);
        const data = await response.json();

        if (response.ok) {
          setNome(data.nome);
          setEmail(data.email);
          setTelefone(data.telefone);
        } else {
          setToastMessage(data.error || "Erro ao carregar os dados do tutor.");
          setToastVariant("error");
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setToastMessage("Erro ao carregar os dados. Tente novamente.");
        setToastVariant("error");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchTutorData();
  }, [id]);

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/tutor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, telefone, senha }),
      });

      const data = await response.json();
      if (!response.ok) {
        setToastMessage(data.error);
        setToastVariant("error");
      } else {
        setToastMessage("Perfil atualizado com sucesso!");
        setToastVariant("success");
        setTimeout(() => navigate("/animais"), 2000);
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      setToastMessage("Erro ao tentar atualizar o perfil.");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  const loading = isLoadingData || isLoading;

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {loading && <Spinner />}

      {!loading && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Editar Perfil
          </h1>
          <form onSubmit={handleSalvar}>
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="telefone"
                className="block text-sm font-medium text-gray-700"
              >
                Telefone:
              </label>
              <input
                type="text"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-gray-700"
              >
                Senha:
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
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
              {isLoading ? "Carregando..." : "Salvar Alterações"}
            </button>
          </form>

          <Toast
            message={toastMessage}
            variant={toastVariant}
            onClose={() => setToastMessage(null)}
          />
        </div>
      )}
    </div>
  );
}
