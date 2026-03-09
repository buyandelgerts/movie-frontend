import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const PaginatedGrid = ({
  title,
  items,
  renderItem,
  itemsPerPage = 4,
  gridClass = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  actionBtn,
}: any) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const next = () => setPage((p) => (p + 1) % totalPages);
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  const visibleItems = items.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <div className="mb-12">
      <div className="flex justify-between items-end mb-6 border-l-4 border-red-600 pl-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-4">
          {actionBtn && (
            <button className="text-red-500 text-sm font-semibold hover:text-red-400">
              {actionBtn}
            </button>
          )}
          {totalPages > 1 && (
            <div className="flex gap-2">
              <button
                title="chevronLeft"
                onClick={prev}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                title="chevronRight"
                onClick={next}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Container to maintain height during sliding/fading if needed */}
      <div className="min-h-[250px]">
        <div
          className={`grid gap-4 md:gap-6 ${gridClass} animate-fade-in`}
          key={page}
        >
          {visibleItems.map(renderItem)}
        </div>
      </div>

      {/* Pager Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                page === i
                  ? "w-8 bg-red-600"
                  : "w-2 bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PaginatedGrid;
