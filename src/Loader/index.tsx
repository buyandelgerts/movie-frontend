const Loader = ({ message }: { message: string }) => {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-[#0f0a0a]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
        <p className="text-gray-400 font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
