import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import DetailsPage from "./DetailsPage";
import CinemasPage from "./CinemasPage";
import {
  getAccessToken,
  getStoredToken,
  clearToken,
} from "./services/authService";
import LoaderPage from "./Loader";
import SearchResultsPage from "./SearchResultsPage";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      let token = getStoredToken();
      if (!token) token = await getAccessToken(apiUrl);
      try {
        const response = await fetch(apiUrl + "/movie/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 401) {
          clearToken();
          token = await getAccessToken(apiUrl);
          const retryResponse = await fetch(apiUrl + "/movie/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!retryResponse.ok)
            throw new Error("Failed to fetch movies after retry");
          const retryData = await retryResponse.json();
          setMovies(retryData);
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        if (data.length === 0) throw new Error("No movies found");
        setMovies(data);
      } catch (err: any) {
        clearToken();
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) setActiveTab("search");
    else setActiveTab("home");
  };

  const handleNavigateMovie = (_id: number) => {
    setSelectedMovie(movies.find((movie) => movie.tmdb_id === _id));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveTab("details");
  };

  const renderContent = () => {
    if (isLoading) {
      <LoaderPage message={"Loading fresh data from ETL pipeline..."} />;
      return;
    }

    if (error) {
      return (
        <div className="min-h-screen bg-[#0f0a0a] flex items-center justify-center text-white">
          Error loading data: {error}
        </div>
      );
    }

    switch (activeTab) {
      case "search":
        return (
          <SearchResultsPage
            query={searchQuery}
            onMovieSelect={handleNavigateMovie}
            movies={movies}
          />
        );
      case "home":
        return <HomePage movies={movies} onNavigate={handleNavigateMovie} />;
      case "details":
        return (
          <DetailsPage
            movie={selectedMovie}
            onBack={() => setActiveTab("home")}
            onCinemaClick={() => setActiveTab("cinemas")}
          />
        );
      case "cinemas":
        return <CinemasPage movie={selectedMovie} />;
      default:
        return <HomePage movies={movies} onNavigate={handleNavigateMovie} />;
    }
  };

  return (
    <div className="bg-[#0f0a0a] min-h-screen font-sans text-gray-100 selection:bg-red-500/30">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      {renderContent()}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes fade-in-up {
           from { opacity: 0; transform: translateY(20px); }
           to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
           animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in {
            animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
