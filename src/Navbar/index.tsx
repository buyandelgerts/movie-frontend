import { Bell, Search } from "lucide-react";

const Navbar = ({
  activeTab,
  setActiveTab,
  searchQuery,
  onSearch,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0505]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-10">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab("home")}
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-red-600 to-red-500 rounded flex items-center justify-center font-bold text-white text-lg">
            M
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
            MovieETL
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-medium text-sm">
          {["Home", "Cinemas"].map((item) => (
            <button
              key={item}
              onClick={() =>
                setActiveTab(
                  item.toLowerCase() === "cinemas" ? "cinemas" : "home"
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
            placeholder="Search movies"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
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
