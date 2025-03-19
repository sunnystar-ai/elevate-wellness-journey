
const TrendsSection = () => {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-lg font-medium">Your Trends</h2>
        <div className="flex text-xs font-medium bg-secondary rounded-full overflow-hidden">
          <button className="px-3 py-1 bg-primary text-white">Week</button>
          <button className="px-3 py-1">Month</button>
          <button className="px-3 py-1">Year</button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-2">
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <div className="text-sm font-medium mb-2">Physical Activity</div>
          <div className="h-20 flex items-end justify-between">
            {[30, 45, 60, 70, 50, 80, 65].map((height, i) => (
              <div 
                key={i} 
                className="w-2 bg-harmony-blue rounded-full"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <div className="text-sm font-medium mb-2">Mental Wellness</div>
          <div className="h-20 flex items-end justify-between">
            {[50, 55, 60, 65, 70, 75, 80].map((height, i) => (
              <div 
                key={i} 
                className="w-2 bg-harmony-lavender rounded-full"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <button className="text-primary hover:underline text-sm font-medium w-full text-center mt-1">
        View Detailed Reports
      </button>
    </div>
  );
};

export default TrendsSection;
