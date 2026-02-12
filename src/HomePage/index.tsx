import {
  Bell,
  Play,
  Info,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { MOCK_MOVIES } from "../mock/data";

const HomePage = ({ onNavigate }: { onNavigate: (id: number) => void }) => {
  const heroMovie = MOCK_MOVIES[0];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[85vh] md:h-[75vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#120a0a] via-[#120a0a]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120a0a] via-[#120a0a]/60 to-transparent z-10" />
        <img
          src={heroMovie.backdrop}
          alt={heroMovie.title}
          className="w-full h-full object-cover object-top"
        />

        <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 max-w-2xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-red-600/90 text-white text-xs font-bold px-2 py-1 rounded mb-4">
            NEW RELEASE
          </div>
          <div className="flex items-center gap-3 text-amber-400 text-sm mb-2">
            <div className="flex gap-1">
              <Star size={14} fill="currentColor" /> 8.9
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">2024</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">Sci-Fi / Adventure</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">2h 46m</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            {heroMovie.title}
          </h1>
          <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-8 max-w-lg">
            Paul Atreides unites with Chani and the Fremen while on a warpath of
            revenge against the conspirators who destroyed his family. Facing a
            choice between the love of his life and the fate...
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate(heroMovie.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-red-900/40"
            >
              <Play size={20} fill="currentColor" /> Watch Trailer
            </button>
            <button
              onClick={() => onNavigate(heroMovie.id)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all border border-white/10"
            >
              <Info size={20} /> More Info
            </button>
          </div>
        </div>

        {/* Carousel Indicators Mock */}
        <div className="absolute bottom-16 right-16 z-20 flex gap-2">
          <div className="w-8 h-1 bg-red-600 rounded-full"></div>
          <div className="w-4 h-1 bg-gray-600 rounded-full"></div>
          <div className="w-4 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10 relative z-30">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Column */}
          <div className="flex-1">
            {/* TV Series Section */}
            <div className="mb-12">
              <div className="flex justify-between items-end mb-6 border-l-4 border-red-600 pl-4">
                <h2 className="text-2xl font-bold text-white">
                  Ongoing TV Series
                </h2>
                <div className="flex gap-2">
                  <button
                    title="chevron-left"
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    title="chevron-right"
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {MOCK_MOVIES.filter((m) => m.type === "series").map(
                  (series) => (
                    <div
                      key={series.id}
                      className="group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer shadow-lg shadow-black/50"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${
                          series.image.split("w500")[1]
                        }`}
                        alt={series.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100" />
                      <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                        ★ {series.rating}
                      </div>
                      <div className="absolute bottom-0 left-0 p-3 w-full">
                        <h3 className="text-white font-bold text-sm truncate">
                          {series.title}
                        </h3>
                        <p className="text-gray-400 text-xs truncate mt-0.5">
                          {series.status}
                        </p>
                      </div>
                    </div>
                  )
                )}
                {/* Filler for UI */}
                <div className="group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer bg-[#1f1616] flex items-center justify-center border border-white/5">
                  <span className="text-gray-500 text-sm">More Series</span>
                </div>
                <div className="hidden md:block group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer bg-[#1f1616] flex items-center justify-center border border-white/5">
                  <span className="text-gray-500 text-sm">More Series</span>
                </div>
              </div>
            </div>

            {/* Popular Movies Section */}
            <div className="mb-12">
              <div className="flex justify-between items-end mb-6 border-l-4 border-red-600 pl-4">
                <h2 className="text-2xl font-bold text-white">
                  Popular Movies
                </h2>
                <button className="text-red-500 text-sm font-semibold hover:text-red-400">
                  VIEW ALL
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_MOVIES.filter((m) => m.type === "movie" && m.id !== 1)
                  .slice(0, 4)
                  .map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => onNavigate(movie.id)}
                      className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                    >
                      <img
                        src={movie.backdrop}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-5">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {movie.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white">
                            PG-13
                          </span>
                          <span className="text-gray-400 text-xs">
                            {movie.genre.join("/")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Classics List */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-6 border-l-4 border-red-600 pl-4">
                <h2 className="text-2xl font-bold text-white">
                  Top Rated Classics
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "The Godfather",
                    year: "1972",
                    genre: "Crime, Drama",
                    rating: 9.2,
                    img: "https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
                  },
                  {
                    title: "The Shawshank Redemption",
                    year: "1994",
                    genre: "Drama",
                    rating: 9.3,
                    img: "https://image.tmdb.org/t/p/w200/lyQBXzOQKo0bOmTMuXlBbUY51G3.jpg",
                  },
                  {
                    title: "The Dark Knight",
                    year: "2008",
                    genre: "Action, Crime",
                    rating: 9.0,
                    img: "https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                  },
                ].map((classic, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-[#1a1111] p-3 rounded-lg hover:bg-[#251818] transition-colors cursor-pointer group"
                  >
                    <img
                      src={classic.img}
                      alt={classic.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-bold group-hover:text-red-500 transition-colors">
                        {classic.title}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {classic.year} • {classic.genre}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold pr-4">
                      <Star size={14} fill="currentColor" /> {classic.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Coming Soon</h3>
              </div>

              {/* Featured Coming Soon */}
              <div className="bg-[#1a1111] rounded-xl p-4 border border-white/5 mb-6">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <img
                    src="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHkjJDveYoK.jpg"
                    alt="Dune Messiah"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play
                      size={32}
                      className="text-white drop-shadow-lg"
                      fill="white"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-bold">Dune: Messiah</h4>
                  <span className="text-red-500 text-xs font-bold mt-1">
                    DEC 2026
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">
                  The saga continues as Paul Atreides faces new threats to his
                  rule as Emperor.
                </p>
                <div className="space-y-3">
                  {[
                    { name: "Deadpool 3", date: "July 26, 2024" },
                    { name: "Joker: Folie à Deux", date: "Oct 4, 2024" },
                    { name: "Gladiator 2", date: "Nov 22, 2024" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2 border-t border-white/5"
                    >
                      <div>
                        <div className="text-gray-200 text-sm font-medium">
                          {item.name}
                        </div>
                        <div className="text-gray-500 text-xs">{item.date}</div>
                      </div>
                      <Bell
                        size={14}
                        className="text-gray-500 hover:text-white cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 border border-white/10 text-gray-300 text-sm rounded hover:bg-white/5 transition-colors">
                  View Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Mock */}
      <footer className="mt-12 py-10 border-t border-white/5 bg-[#0d0707] text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-tr from-red-600 to-red-500 rounded flex items-center justify-center font-bold text-white text-xs">
            M
          </div>
          <span className="font-bold text-white">MovieDeck</span>
        </div>
        <p className="text-gray-600 text-xs">
          © 2024 MovieDeck. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
