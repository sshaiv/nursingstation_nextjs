const ReusableInputField = ({ id, label, width = 'w-24' }) => {
    return (
        <div className={`relative ${width}`}>
            <input
                type="text"
                id={id}
                className="peer h-8 w-full border-b-2 rounded-lg border-gray-500 text-xs placeholder-transparent focus:outline-none focus:border-black"
                placeholder={label}
            />
            <label
                htmlFor={id}
                className="absolute left-0 -top-3.5 text-gray-600 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gray-600"
            >
                {label}
            </label>
        </div>
    );
};

export default ReusableInputField;
