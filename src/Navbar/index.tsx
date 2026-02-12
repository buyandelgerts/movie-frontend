import { Bell, Search } from "lucide-react";

const Navbar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#120a0a]/95 backdrop-blur-md z-50 flex items-center justify-between px-6 border-b border-white/5">
      <div className="flex items-center gap-12">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab("home")}
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-red-600 to-red-500 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-red-600/20">
            M
          </div>
          <span className="text-xl font-bold text-white tracking-wide">
            MovieDeck
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Home", "Movies", "Series", "Cinemas", "News"].map((item) => (
            <button
              key={item}
              onClick={() =>
                setActiveTab(
                  item.toLowerCase() === "home"
                    ? "home"
                    : item.toLowerCase() === "cinemas"
                    ? "cinemas"
                    : "home"
                )
              }
              className={`transition-colors ${
                activeTab === item.toLowerCase() ||
                (activeTab === "details" && item === "Movies")
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 text-gray-400">
        <div className="hidden md:flex items-center bg-[#1f1616] px-3 py-1.5 rounded-full border border-white/5 w-64">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search movies, actors..."
            className="bg-transparent border-none outline-none text-sm text-white ml-2 w-full placeholder-gray-500"
          />
        </div>
        <button title="bell" className="hover:text-white transition-colors">
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-gray-600 cursor-pointer">
          <img src="https://i.pravatar.cc/150?img=3" alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
