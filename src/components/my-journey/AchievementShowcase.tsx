
import { ScrollArea } from '@/components/ui/scroll-area';

const AchievementShowcase = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">Recent Achievements</h2>
      </div>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-3 p-1">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <span className="text-white text-xl">🔥</span>
            </div>
            <span className="text-xs mt-1">7-Day Streak</span>
            <span className="text-[10px] text-muted-foreground">Mar 10</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
              <span className="text-white text-xl">🏃</span>
            </div>
            <span className="text-xs mt-1">50 Miles</span>
            <span className="text-[10px] text-muted-foreground">Mar 12</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <span className="text-white text-xl">💧</span>
            </div>
            <span className="text-xs mt-1">Hydration Pro</span>
            <span className="text-[10px] text-muted-foreground">Mar 14</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl">🧘</span>
            </div>
            <span className="text-xs mt-1">Zen Master</span>
            <span className="text-[10px] text-muted-foreground">Locked</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl">🍎</span>
            </div>
            <span className="text-xs mt-1">Nutrition Guru</span>
            <span className="text-[10px] text-muted-foreground">Locked</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AchievementShowcase;
