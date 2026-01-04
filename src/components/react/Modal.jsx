export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Contenedor del modal */}
      <div
        className="
          bg-white rounded-xl shadow-xl p-6
          w-full max-w-lg
          transform transition-all duration-300
          scale-100 opacity-100
          animate-modal
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
