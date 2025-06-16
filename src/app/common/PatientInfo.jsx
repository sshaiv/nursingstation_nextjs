
// export default function LineItem({ icon, label, value }) {
//     return (
//         <div className="flex items-center gap-0.5 text-[9px] leading-none">
//             {icon && <span className="text-gray-700">{icon}</span>}
//             <span className="font-semibold text-gray-800 font-serif">{label}:</span>
//             <span className="font-medium text-3px text-gray-600 font-sans">{value}</span>
//         </div>
//     );
// }
export default function LineItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-1 text-[11px] text-gray-700 font-medium">
      {icon && <span className="text-[12px]">{icon}</span>}
      <span className="font-semibold text-gray-800">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}
