import { useState, useEffect } from "react";
import { Toast } from "../ui/toast";
import Spinner from "../ui/spinner";
import { Animal } from "../../api/models/animalModel";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../ui/modal";

export default function ListagemAnimais() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVariant, setToastVariant] = useState<"success" | "error">(
    "success"
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [animalIdToDelete, setAnimalIdToDelete] = useState<number | null>(null);

  const tutorId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (tutorId) {
      fetchAnimais(tutorId);
    } else {
      setToastMessage("Tutor não encontrado.");
      setToastVariant("error");
      setIsLoading(false);
    }
  }, [token, tutorId, navigate]);

  const fetchAnimais = async (tutorId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/animal?tutor=${tutorId}`);
      const data = await response.json();

      if (!response.ok) {
        setToastMessage(data.error || "Erro ao buscar animais.");
        setToastVariant("error");
      } else {
        setAnimais(data);
        setToastMessage("Animais carregados com sucesso.");
        setToastVariant("success");
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      setToastMessage("Erro de rede. Tente novamente.");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsModalOpen(true);
    setAnimalIdToDelete(id);
  };

  const confirmDelete = async () => {
    if (animalIdToDelete !== null) {
      try {
        const response = await fetch(`/api/animal/${animalIdToDelete}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setToastMessage("Animal excluído com sucesso.");
          setToastVariant("success");
          setAnimais((prevAnimais) =>
            prevAnimais.filter((animal) => animal.id !== animalIdToDelete)
          );
        } else {
          const data = await response.json();
          setToastMessage(data.error || "Erro ao excluir animal.");
          setToastVariant("error");
        }
      } catch (err) {
        console.error("Erro de rede:", err);
        setToastMessage("Erro de rede. Tente novamente.");
        setToastVariant("error");
      } finally {
        setIsModalOpen(false);
      }
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setAnimalIdToDelete(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {isLoading && <Spinner />}

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl z-10">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Listagem de Animais
        </h1>

        <div className="mb-4 text-center">
          <Link
            to="/cadastro-animal"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
          >
            Cadastrar Novo Animal
          </Link>
        </div>

        {animais.length === 0 ? (
          <p className="text-center text-gray-500">
            Você não tem animais cadastrados.
          </p>
        ) : (
          <ul className="space-y-6">
            {animais.map((animal) => (
              <li
                key={animal.id}
                className="py-6 px-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-xl font-bold text-gray-800">
                      {animal.nome}
                    </strong>{" "}
                    <span className="text-gray-600">
                      ({animal.especie} - {animal.raca})
                    </span>
                    <p className="text-gray-500 mt-1">
                      Idade: {animal.idade} anos
                    </p>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <Link
                      to={`/editar-animal/${animal.id}`}
                      className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg p-2 transition duration-200"
                    >
                      <span className="font-semibold">Editar</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(animal.id)}
                      className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-lg p-2 transition duration-200"
                    >
                      <span className="font-semibold">Excluir</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Toast
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastMessage(null)}
      />
      {isModalOpen && (
        <Modal
          message="Tem certeza que deseja excluir este animal?"
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
