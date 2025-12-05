export default function Input({ label, type, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value} // valor controlado
        onChange={onChange} // actualiza el estado del padre
        className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
  );
}
