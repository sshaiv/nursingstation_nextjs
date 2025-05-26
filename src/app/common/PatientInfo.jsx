// // components/common/LineItem.jsx
// export default function LineItem({ icon, label, value }) {
//     return (
//         <div className="flex items-center gap-1 text-sm">
//             {icon}
//             <span className="font-semibold  text-gray-800 text-xs font-serif">{label}:</span>
//             <span className="font-semibold text-gray-600 text-xs font-sans">{value}</span>
//         </div>
//     );
// }


// components/common/LineItem.jsx
export default function LineItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-0.5 text-[10px] leading-none">
            {icon && <span className="text-gray-700">{icon}</span>}
            <span className="font-semibold text-gray-800 font-serif">{label}:</span>
            <span className="font-medium text-gray-600 font-sans">{value}</span>
        </div>
    );
}
