import { Play, Search } from "lucide-react";
import type { Movie } from "../interfaces/Movie";

const SearchResults = ({
  query,
  onMovieSelect,
  movies,
}: {
  query: string;
  onMovieSelect: (tmdb_id: number) => void;
  movies: Movie[];
}) => {
  const lowerQuery = query.toLowerCase();
  const allSearchable = [...movies];
  const results = allSearchable.filter((m) =>
    m.title.toLowerCase().includes(lowerQuery)
  );
  const imgURL = import.meta.env.VITE_API_BASE_IMG_URL;

  return (
    <div className="pt-32 px-6 md:px-12 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-8">Search Results for "{query}"</h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((movie) => (
            <div
              key={movie.tmdb_id}
              onClick={() => onMovieSelect(movie.tmdb_id)}
              className="cursor-pointer group flex flex-col"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
                <img
                  src={imgURL + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play size={40} className="text-white drop-shadow-lg" />
                </div>
              </div>
              <h3 className="font-semibold text-sm line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {movie.release_date} • {movie.genres}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Search size={64} className="mb-4 opacity-20" />
          <p className="text-lg">No movies found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
