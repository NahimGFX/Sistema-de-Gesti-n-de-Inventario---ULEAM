export default function KpiCard({ title, value, subtitle = "" }) {
  return (
    <div className="h-38 bg-uleam-gray rounded-xl shadow-md p-6 border border-gray-200 text-white flex-col items-center text-center">

      {/*Titulo*/}
      <h3 className="text-2xl font-medium tracking-wide">{title}</h3>

      {/*Valor*/}
      <p className="text-3xl font-semibold my-2">{value}</p>

      {/*Subtitlo Opcional*/}
      {subtitle && <p className="text-base">{subtitle}</p>}
    </div>
  );
}
