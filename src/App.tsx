import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import DetailsPage from "./DetailsPage";
import CinemasPage from "./CinemasPage";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleNavigateMovie = (id: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveTab("details");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={handleNavigateMovie} />;
      case "details":
        return (
          <DetailsPage
            onBack={() => setActiveTab("home")}
            onCinemaClick={() => setActiveTab("cinemas")}
          />
        );
      case "cinemas":
        return <CinemasPage />;
      default:
        return <HomePage onNavigate={handleNavigateMovie} />;
    }
  };

  return (
    <div className="bg-[#0f0a0a] min-h-screen font-sans text-gray-100 selection:bg-red-500/30">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
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
