import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Info,
  Play,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Movie } from "../interfaces/Movie";
import PaginatedGrid from "../PaginatedGrid";

const HomePage = ({
  movies,
  onNavigate,
}: {
  movies: Movie[];
  onNavigate: (id: number) => void;
}) => {
  const [expandedSoonId, setExpandedSoonId] = useState<number | null>(null);

  // Hero Carousel Logic (Switch every 5 seconds)
  const heroMovies = movies.filter((m) => m.type === "UPCOMING").slice(0, 5);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroMovies.length]);

  const heroMovie = heroMovies[heroIdx];
  const upcomingList = movies.filter((m) => m.type === "UPCOMING");
  const popularList = movies.filter((m) => m.type === "POPULAR");
  const topRatedList = movies.filter((m) => m.type === "TOP_RATED");
  const nowPlayingList = movies.filter((m) => m.type === "NOW_PLAYING");
  const [visibleComingSoon, setVisibleComingSoon] = useState(5);
  const imgURL = import.meta.env.VITE_API_BASE_IMG_URL;

  const handleLoadMore = () => {
    setVisibleComingSoon((prev) => prev + 5);
  };

  return (
    <div className="pb-20">
      {/* Hero Section Carousel */}
      <div className="relative w-full h-[85vh] md:h-[75vh] overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-[#120a0a] via-[#120a0a]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120a0a] via-[#120a0a]/60 to-transparent z-10" />

        {/* Background Images Crossfade */}
        {heroMovies.map((movie, idx) => (
          <img
            key={movie.tmdb_id}
            src={imgURL + movie.poster_path}
            alt={movie.title}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${
              idx === heroIdx ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          />
        ))}

        {/* Hero Content (Re-animates on index change) */}
        <div
          key={heroIdx}
          className="absolute bottom-0 left-0 p-8 md:p-16 z-20 max-w-2xl animate-fade-in-up"
        >
          <div className="inline-flex items-center gap-2 bg-red-600/90 text-white text-xs font-bold px-2 py-1 rounded mb-4">
            {heroMovie.type}
          </div>
          <div className="flex items-center gap-3 text-amber-400 text-sm mb-2">
            <div className="flex gap-1">
              <Star size={14} fill="currentColor" /> {heroMovie.vote_average}
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">{heroMovie.release_date}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">{heroMovie.genres}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {heroMovie.title}
          </h1>
          <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-8 max-w-lg drop-shadow-md">
            {heroMovie.overview}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate(heroMovie.tmdb_id)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-red-900/40"
            >
              <Play size={20} fill="currentColor" /> Watch Trailer
            </button>
            <button
              onClick={() => onNavigate(heroMovie.tmdb_id)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all border border-white/10"
            >
              <Info size={20} /> More Info
            </button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-16 right-16 z-20 flex gap-2">
          {heroMovies.map((_, idx) => (
            <button
              title="Switch Hero"
              key={idx}
              onClick={() => setHeroIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === heroIdx
                  ? "w-8 bg-red-600"
                  : "w-3 bg-gray-500 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10 relative z-30">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Column */}
          <div className="flex-1 overflow-hidden">
            {/* TV Series Section with Pager */}
            <PaginatedGrid
              key={nowPlayingList.length + "nowplaying"}
              title="Now Playing Movies"
              items={nowPlayingList}
              itemsPerPage={4}
              gridClass="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              renderItem={(nowPlaying: Movie) => (
                <div
                  key={nowPlaying.tmdb_id}
                  onClick={() => onNavigate(nowPlaying.tmdb_id)}
                  className="group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer shadow-lg shadow-black/50"
                >
                  <img
                    src={imgURL + nowPlaying.poster_path}
                    alt={nowPlaying.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100" />
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg">
                    ★ {nowPlaying.vote_average}
                  </div>
                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <h3 className="text-white font-bold text-sm truncate">
                      {nowPlaying.title}
                    </h3>
                    <p className="text-gray-400 text-xs truncate mt-0.5">
                      {nowPlaying.genres}
                    </p>
                  </div>
                </div>
              )}
            />

            {/* Popular Movies Section with Pager */}
            <PaginatedGrid
              key={popularList.length + "popular"}
              title="Popular Movies"
              // actionBtn="VIEW ALL"
              items={popularList}
              itemsPerPage={4}
              gridClass="grid-cols-1 md:grid-cols-2"
              renderItem={(popular: Movie) => (
                <div
                  key={popular.tmdb_id}
                  onClick={() => onNavigate(popular.tmdb_id)}
                  className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-lg"
                >
                  <img
                    src={imgURL + popular.backdrop_path}
                    alt={popular.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                      {popular.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 text-xs drop-shadow-md">
                        {popular.genres}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            />

            {/* Classics List with Pager */}
            <PaginatedGrid
              key={topRatedList.length + "toprated"}
              title="Top Rated Classics"
              items={topRatedList}
              itemsPerPage={5}
              gridClass="grid-cols-1"
              renderItem={(topRated: any) => (
                <div
                  key={topRated.tmdb_id}
                  onClick={() => onNavigate(topRated.tmdb_id)}
                  className="flex items-center gap-4 bg-[#1a1111] p-3 rounded-lg hover:bg-[#251818] transition-colors cursor-pointer group border border-transparent hover:border-white/5"
                >
                  <img
                    src={imgURL + topRated.poster_path}
                    alt={topRated.title}
                    className="w-12 h-16 object-cover rounded shadow-md"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-bold group-hover:text-red-500 transition-colors">
                      {topRated.title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">
                      {topRated.release_date} • {topRated.genres}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold pr-4">
                    <Star size={14} fill="currentColor" />{" "}
                    {topRated.vote_average}
                  </div>
                </div>
              )}
            />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Coming Soon</h3>
              </div>

              <div className="space-y-2">
                {upcomingList.slice(0, visibleComingSoon).map((item) => {
                  const isExpanded = expandedSoonId === item.tmdb_id;

                  return (
                    <div
                      key={item.tmdb_id}
                      className="border-b border-white/5 pb-2 last:border-0 last:pb-0"
                    >
                      {isExpanded ? (
                        <div className="bg-[#1a1111] rounded-xl p-4 border border-white/5 animate-fade-in">
                          {/* Clickable Header to Collapse */}
                          <div
                            className="flex justify-between items-start mb-3 cursor-pointer group"
                            onClick={() => setExpandedSoonId(null)}
                          >
                            <div>
                              <h4 className="text-white font-bold group-hover:text-red-400 transition-colors">
                                {item.title}
                              </h4>
                              <span className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <Calendar size={12} />
                                {item.release_date}
                              </span>
                            </div>
                            <div className="p-1 group-hover:bg-white/10 rounded-full transition-colors">
                              <ChevronUp
                                size={16}
                                className="text-gray-400 group-hover:text-white"
                              />
                            </div>
                          </div>

                          {/* Image and content navigating to details */}
                          <div
                            className="relative aspect-video rounded-lg overflow-hidden mb-3 cursor-pointer group/img"
                            onClick={() => onNavigate(item.tmdb_id)}
                          >
                            <img
                              src={imgURL + item.poster_path}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/img:bg-black/10 transition-colors">
                              <Play
                                size={32}
                                className="text-white drop-shadow-lg scale-90 group-hover/img:scale-100 transition-transform"
                                fill="white"
                              />
                            </div>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed mb-3">
                            {item.overview}
                          </p>
                          <button
                            onClick={() => onNavigate(item.tmdb_id)}
                            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded transition-colors flex justify-center items-center gap-2"
                          >
                            <Info size={14} /> View Details
                          </button>
                        </div>
                      ) : (
                        <div
                          className="flex justify-between items-center py-2 cursor-pointer group hover:bg-white/5 px-2 rounded -mx-2 transition-colors"
                          onClick={() => setExpandedSoonId(item.tmdb_id)}
                        >
                          <div>
                            <div className="text-gray-200 text-sm font-medium group-hover:text-red-400 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                              <Calendar size={12} />
                              {item.release_date}
                            </div>
                          </div>
                          <div
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <ChevronDown
                              size={14}
                              className="text-gray-500 hover:text-white transition-colors"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {visibleComingSoon < upcomingList.length && (
                <button
                  onClick={handleLoadMore}
                  className="w-full mt-6 py-3 rounded-lg border border-white/10 text-gray-300 font-medium hover:bg-white/5 hover:text-white transition-colors"
                >
                  View more
                </button>
              )}
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
          <span className="font-bold text-white">MovieETL</span>
        </div>
        <p className="text-gray-600 text-xs">
          © 2026 MovieETL. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
