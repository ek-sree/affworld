
const SkeletonLoading = () => {
  return (
    <div className="min-h-screen bg-slate-950 p-6 relative">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="mb-6 flex justify-between items-center animate-pulse">
          <div>
            <div className="h-8 bg-slate-800 rounded w-48 mb-2"></div>
            <div className="h-4 bg-slate-800 rounded w-64"></div>
          </div>
          <div className="h-10 w-32 bg-slate-800 rounded-full"></div>
        </div>

        {[1, 2, 3].map((_, index) => (
          <div 
            key={index} 
            className="bg-slate-900 rounded-xl shadow-lg overflow-hidden animate-pulse"
          >
            <div className="flex items-center p-4 bg-slate-800">
              <div className="w-10 h-10 rounded-full mr-3 bg-slate-700"></div>
              <div>
                <div className="h-4 bg-slate-700 rounded w-32"></div>
              </div>
            </div>

            <div className="p-4">
              <div className="h-4 bg-slate-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-800 rounded w-3/4 mb-4"></div>

              <div className="bg-slate-800 rounded-lg overflow-hidden mb-4 aspect-video"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoading;