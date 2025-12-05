export default function BotonEnviar({ text }) {
  return (
    <button
      type="submit"
      className="bg-uleam-red text-white py-2 rounded-lg font-medium mt-4 
                 hover:bg-uleam-gray transition cursor-pointer"
    >
      {text}
    </button>
  );
}
