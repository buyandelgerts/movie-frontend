import { useState } from "react";
import { THEATERS } from "../mock/data";
import { Calendar, ChevronRight, Film, MapPin, Share2 } from "lucide-react";
import type { Movie } from "../interfaces/Movie";

const CinemasPage = ({ movie }: { movie: Movie }) => {
  const [selectedTheater, setSelectedTheater] = useState<number>(1);
  const activeTheater =
    THEATERS.find((t) => t.id === selectedTheater) || THEATERS[0];

  return (
    <div className="h-[calc(100vh-64px)] mt-16 flex flex-col md:flex-row overflow-hidden bg-[#120a0a]">
      {/* Sidebar List */}
      <div className="w-full md:w-[450px] flex flex-col h-full border-r border-white/5 bg-[#120a0a] z-10 relative shadow-2xl">
        {/* Top Controls */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpg`}
              alt="Poster"
              className="w-10 h-14 rounded object-cover border border-white/10"
            />
            <div>
              <div className="text-red-500 text-[10px] font-bold mb-0.5">
                NOW SHOWING
              </div>
              <h2 className="text-white font-bold text-lg leading-tight">
                {movie.title}
              </h2>
              <div className="text-gray-400 text-xs">
                PG-13 • {movie.release_date} • {movie.genres}
              </div>
            </div>
          </div>

          <div className="bg-[#1f1616] p-2 rounded-lg flex items-center justify-between cursor-pointer border border-white/5 mb-4 hover:bg-[#2a1d1d] transition-colors">
            <div className="flex items-center gap-2 text-white text-sm">
              <MapPin size={16} className="text-red-500" />
              <span>San Francisco, CA</span>
            </div>
            <div className="text-gray-400">
              <MapPin size={16} />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button className="flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
              <Calendar size={14} /> Today, Oct 24
            </button>
            <button className="flex items-center gap-1 bg-[#1f1616] text-gray-300 border border-white/5 hover:bg-[#2a1d1d] text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap">
              Format: IMAX <ChevronRight size={12} className="rotate-90" />
            </button>
            <button className="flex items-center gap-1 bg-[#1f1616] text-gray-300 border border-white/5 hover:bg-[#2a1d1d] text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap">
              Distance <ChevronRight size={12} className="rotate-90" />
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-500 font-medium">
            8 CINEMAS NEARBY
          </div>
        </div>

        {/* Theater List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {THEATERS.map((theater) => (
            <div
              key={theater.id}
              onClick={() => setSelectedTheater(theater.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedTheater === theater.id
                  ? "bg-[#1f1616] border-red-500/50 relative overflow-hidden"
                  : "bg-[#181010] border-transparent hover:bg-[#1f1616]"
              }`}
            >
              {selectedTheater === theater.id && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_red]"></div>
              )}

              <div className="flex justify-between items-start mb-1">
                <h3 className="text-white font-bold">{theater.name}</h3>
                <div className="flex items-center gap-1 bg-[#2a1d1d] px-1.5 py-0.5 rounded text-[10px] text-green-400 font-bold">
                  {theater.rating} ★
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                <MapPin size={10} /> {theater.address}
              </div>

              <div className="flex flex-wrap gap-2">
                {theater.times.length > 0 ? (
                  theater.times.map((t, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col rounded overflow-hidden text-center min-w-[60px] cursor-pointer ${
                        t.status === "selling-fast" ? "group" : ""
                      }`}
                    >
                      <div
                        className={`text-xs font-bold py-1.5 ${
                          t.status === "selling-fast"
                            ? "bg-red-600 text-white"
                            : t.status === "available"
                            ? "bg-[#2d3748] text-white"
                            : "bg-gray-800 text-gray-500"
                        }`}
                      >
                        {t.time}
                      </div>
                      <div className="bg-[#0f0a0a] text-[9px] text-gray-400 py-0.5 uppercase tracking-tighter border-x border-b border-white/5">
                        {t.type}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-red-900/50 text-xs italic">
                    No more showings today
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 bg-[#151515] relative overflow-hidden hidden md:block">
        {/* CSS Grid Pattern for Map */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                      linear-gradient(#222 1px, transparent 1px),
                      linear-gradient(90deg, #222 1px, transparent 1px)
                  `,
            backgroundSize: "80px 80px",
            backgroundColor: "#0c0c0c",
          }}
        >
          {/* Decorative Map Elements (Roads) */}
          <div className="absolute top-0 bottom-0 left-[30%] w-3 bg-[#1a1a1a]" />
          <div className="absolute top-0 bottom-0 left-[65%] w-4 bg-[#1a1a1a]" />
          <div className="absolute left-0 right-0 top-[40%] h-3 bg-[#1a1a1a]" />
          <div className="absolute left-0 right-0 top-[70%] h-4 bg-[#1a1a1a] rotate-2" />
        </div>

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            title="mapPin"
            className="w-10 h-10 bg-[#1f1616] rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-[#2a1d1d] shadow-lg"
          >
            <MapPin size={20} />
          </button>
          <button
            title="share2"
            className="w-10 h-10 bg-[#1f1616] rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-[#2a1d1d] shadow-lg"
          >
            <Share2 size={20} />
          </button>
        </div>

        <div className="absolute bottom-8 right-8 text-gray-600 text-[10px]">
          © OpenStreetMap contributors
        </div>

        {/* Map Markers */}
        {THEATERS.map((theater) => (
          <div
            key={theater.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer"
            style={{
              left: `${theater.coords.x}%`,
              top: `${theater.coords.y}%`,
            }}
            onClick={() => setSelectedTheater(theater.id)}
          >
            {/* Selected Tooltip */}
            {selectedTheater === theater.id && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#1f1616] text-white p-3 rounded-lg border border-white/10 shadow-xl whitespace-nowrap min-w-[140px] z-20 animate-fade-in-up">
                <h4 className="font-bold text-sm">{theater.name}</h4>
                <div className="text-gray-400 text-xs">
                  Next: {theater.times[0]?.time || "Tomorrow"} (
                  {theater.times[0]?.type.toUpperCase() || "STD"})
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1f1616] border-b border-r border-white/10 rotate-45"></div>
              </div>
            )}

            {/* Pin Icon */}
            <div
              className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-transform hover:scale-110 ${
                selectedTheater === theater.id
                  ? "bg-red-600 z-10 scale-110"
                  : "bg-[#2a1d1d] border border-white/10"
              }`}
            >
              {selectedTheater === theater.id ? (
                <MapPin size={20} className="text-white" fill="currentColor" />
              ) : (
                <Film size={18} className="text-gray-400" />
              )}
            </div>
            {/* Pulse effect for selected */}
            {selectedTheater === theater.id && (
              <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-20"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemasPage;
