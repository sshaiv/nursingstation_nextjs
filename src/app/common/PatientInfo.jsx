
export default function LineItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-1 text-[11px] text-gray-700 font-medium">
      {icon && <span className="text-[12px]">{icon}</span>}
      <span className="font-bold text-gray-600">{label}:</span>
      <span className="text-gray-600 ">{value}</span>
    </div>
  );
}
