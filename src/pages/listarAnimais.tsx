import { useState, useEffect } from "react";
import { Toast } from "../ui/toast";
import Spinner from "../ui/spinner";
import { Animal } from "../../api/models/animalModel";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    if (tutorId) {
      fetchAnimais(tutorId);
    } else {
      setToastMessage("Tutor não encontrado.");
      setToastVariant("error");
      setIsLoading(false);
    }
  }, [tutorId]);

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
          setAnimais(
            animais.filter((animal) => animal.id !== animalIdToDelete)
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

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl z-10">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Listagem de Animais
        </h1>

        <div className="mb-4 text-center">
          <Link
            to="/cadastro-animal"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Cadastrar Novo Animal
          </Link>
        </div>

        {animais.length === 0 ? (
          <p className="text-center text-gray-500">
            Você não tem animais cadastrados.
          </p>
        ) : (
          <ul className="space-y-4">
            {animais.map((animal) => (
              <li
                key={animal.id}
                className="border-b py-2 flex items-center justify-between"
              >
                <div>
                  <strong>{animal.nome}</strong> ({animal.especie} -{" "}
                  {animal.raca}) | Idade: {animal.idade} anos
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/editar-animal/${animal.id}`}
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(animal.id)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    Excluir
                  </button>
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
