import { useState, useEffect } from "react";
import { Toast } from "../ui/toast";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../ui/spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVariant, setToastVariant] = useState<"success" | "error">(
    "success"
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("redirectTo")) {
      const redirectTo = localStorage.getItem("redirectTo");
      localStorage.removeItem("redirectTo");

      if (redirectTo) {
        navigate(redirectTo);
      }
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      if (!response.ok) {
        setToastMessage(data.error);
        setToastVariant("error");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);

        setToastMessage(data.message);
        setToastVariant("success");

        localStorage.setItem("redirectTo", "/animais");

        setTimeout(() => {
          navigate("/animais");
        }, 2000);
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      setToastMessage("Erro de rede. Tente novamente.");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {isLoading && <Spinner />}

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm z-10">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Tela de Login
        </h1>
        <form onSubmit={handleLogin}>
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
              placeholder="Digite seu email"
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
              placeholder="Digite sua senha"
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
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/cadastro-tutor"
            className="text-blue-500 hover:text-blue-700"
          >
            Não tem uma conta? Cadastre-se como tutor
          </Link>
        </div>
      </div>

      <Toast
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
