type ModalProps = {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function Modal({ message, onCancel, onConfirm }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-scaleIn">
        <p className="text-gray-800 text-center text-lg mb-8">{message}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
