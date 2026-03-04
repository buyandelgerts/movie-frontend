import { ChevronRight, Heart, MapPin, Play, Share2, Star } from "lucide-react";
import type { Movie } from "../interfaces/Movie";
// import { CAST, MOCK_MOVIES } from "../mock/data";

const DetailsPage = ({
  movies,
  onBack,
  onCinemaClick,
}: {
  movies: Movie[];
  onBack: () => void;
  onCinemaClick: () => void;
}) => {
  const movie = movies[0];

  return (
    <div className="min-h-screen pt-16 animate-fade-in">
      {/* Breadcrumb */}
      <div className="bg-[#120a0a] px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
        <span className="hover:text-white cursor-pointer" onClick={onBack}>
          Home
        </span>
        <ChevronRight size={12} />
        <span className="hover:text-white cursor-pointer">Movies</span>
        <ChevronRight size={12} />
        <span className="text-white font-medium">{movie.title}</span>
      </div>

      {/* Hero/Player */}
      <div className="relative w-full aspect-[21/9] md:aspect-[2.4/1] bg-black group">
        <img
          src={movie.backdrop_path}
          className="w-full h-full object-cover opacity-60"
          alt="Backdrop"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.5)] cursor-pointer hover:scale-110 transition-transform z-20">
            <Play size={32} fill="white" className="text-white ml-1" />
          </div>
        </div>
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#120a0a] to-transparent" />
      </div>

      <div className="container mx-auto px-6 -mt-12 relative z-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-900/50 text-red-200 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/20">
                NOW SHOWING
              </div>
              <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                <Star size={14} fill="currentColor" /> 8.9{" "}
                <span className="text-gray-500 font-normal">/ 10</span>
              </div>
              <div className="text-gray-400 text-sm">• 250k Votes</div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {movie.title}
            </h1>

            <div className="flex gap-3 mb-10">
              <button className="flex items-center gap-2 bg-[#251818] hover:bg-[#302020] text-white px-6 py-2.5 rounded-lg font-medium transition-colors border border-white/5">
                <Heart size={18} /> Watchlist
              </button>
              <button className="flex items-center gap-2 bg-[#251818] hover:bg-[#302020] text-white px-6 py-2.5 rounded-lg font-medium transition-colors border border-white/5">
                <Heart size={18} fill="none" /> Like
              </button>
              <button
                title="share2"
                className="flex items-center gap-2 bg-[#251818] hover:bg-[#302020] text-white px-4 py-2.5 rounded-lg font-medium transition-colors border border-white/5"
              >
                <Share2 size={18} />
              </button>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold text-white mb-3">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.title === "Dune: Part Two"
                  ? "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee."
                  : "Movie description goes here."}
              </p>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Cast & Crew</h3>
                <button className="text-red-500 text-sm flex items-center gap-1 hover:underline">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {movie.credits.map((person, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center min-w-[100px]"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-transparent hover:border-red-500 transition-colors">
                      <img
                        src={person.profile_path}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-white font-medium text-sm text-center leading-tight">
                      {person.name}
                    </div>
                    <div className="text-gray-500 text-xs text-center mt-1">
                      {person.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Movies */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">
                Similar Movies
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    t: "Blade Runner 2049",
                    i: "https://image.tmdb.org/t/p/w300/g84l2202J5Uwd8c3b9b0c5b3b0c.jpg",
                  },
                  {
                    t: "Arrival",
                    i: "https://image.tmdb.org/t/p/w300/pEFRzXtLmxYNjGd0XqJDHpGv1dG.jpg",
                  },
                  {
                    t: "Interstellar",
                    i: "https://image.tmdb.org/t/p/w300/gEU2QniL6C8z1d9u8c3b9b0c5b3.jpg",
                  },
                  {
                    t: "Avatar",
                    i: "https://image.tmdb.org/t/p/w300/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
                  },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="aspect-[2/3] rounded-lg overflow-hidden relative group cursor-pointer"
                  >
                    <img
                      src={m.i}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={m.t}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-sm">
                        {m.t}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
            {/* CTA Card */}
            <div className="bg-[#1a1111] p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Watching Now?
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    Available in IMAX & 3D
                  </p>
                </div>
                <span className="bg-green-900/50 text-green-400 text-[10px] font-bold px-2 py-1 rounded">
                  SELLING FAST
                </span>
              </div>
              <button
                onClick={onCinemaClick}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all"
              >
                <MapPin size={18} /> Find Cinemas Nearby
              </button>
            </div>

            {/* Details Stats */}
            <div className="bg-[#1a1111] p-6 rounded-xl border border-white/5">
              <h3 className="text-white font-bold mb-4">Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Director</span>
                  <span className="text-white">Denis Villeneuve</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Writers</span>
                  <span className="text-white text-right">
                    Denis Villeneuve, Jon Spaihts
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Genre</span>
                  <div className="flex gap-2">
                    <span className="bg-[#2a2020] text-gray-300 px-2 py-0.5 rounded text-xs border border-white/5">
                      Sci-Fi
                    </span>
                    <span className="bg-[#2a2020] text-gray-300 px-2 py-0.5 rounded text-xs border border-white/5">
                      Adventure
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Release Date</span>
                  <span className="text-white">March 1, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Runtime</span>
                  <span className="text-white">2h 46m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Budget</span>
                  <span className="text-white">$190,000,000</span>
                </div>
              </div>
            </div>

            {/* Map Teaser */}
            <div
              className="bg-[#1a1111] rounded-xl overflow-hidden border border-white/5 relative h-40 group cursor-pointer"
              onClick={onCinemaClick}
            >
              {/* CSS Map Pattern */}
              <div
                className="absolute inset-0 bg-[#151515]"
                style={{
                  backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Fake Roads */}
              <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-[#222] rotate-12"></div>
              <div className="absolute left-0 right-0 top-1/2 h-2 bg-[#222] -rotate-6"></div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1111] to-transparent" />

              <div className="absolute bottom-4 left-4">
                <div className="text-red-500 text-[10px] font-bold mb-1">
                  NEAREST THEATER
                </div>
                <div className="text-white font-bold text-sm">
                  AMC CityWalk 19{" "}
                  <span className="text-gray-500 font-normal">1.2mi</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-bold border-b border-white">
                  View all 12 locations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
