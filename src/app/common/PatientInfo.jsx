// components/common/LineItem.jsx
export default function LineItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-1 text-sm">
            {icon}
            <span className="font-semibold  text-gray-800 text-xs font-serif">{label}:</span>
            <span className="font-semibold text-gray-600 text-xs font-sans">{value}</span>
        </div>
    );
}
