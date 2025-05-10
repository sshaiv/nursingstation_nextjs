export default function Header() {
    return (
        <div className="flex items-center border-2 border-cyan-500 h-14 justify-between bg-gradient-to-r from-cyan-700 via-cyan-800 to-cyan-900 shadow-xl rounded-lg">

  <div className="flex items-center gap-2">
                <img src="/scan.png" alt="Scan" className="w-8 h-8" />
            </div>

            {/* Center: Title with image */}
            <div className="flex items-center justify-center gap-2 text-center">
            <img src="/nurse.jpeg" alt="Nurse" className="w-10 h-10 rounded-full border-4 border-white shadow-lg transition-transform duration-300 transform hover:scale-110" />
                <h1 className="text-3xl md:text-2xl font-semibold text-white font-sans tracking-wide shadow-md hover:text-gray-400 transition-all">
                    Nursing Station
                </h1>
            </div>


            {/* Right: User/Profile */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <img
                        src="/login.png"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                    {/* You can add a small lock or status icon if needed */}
                </div>
            </div>
        </div>
    );
}


