import { RecapSlide } from "./RecapSlide";
import { StatCard } from "./StatCard";

export const StatsSlide = () => {
  return (
    <RecapSlide>
      <div className="max-w-2xl w-full space-y-6">
        <h2 className="text-4xl font-black text-center mb-8 animate-fade-in">Your Year in Numbers</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            label="Days on Set" 
            value="127" 
            icon="📅"
            delay={0}
            variant="yellow"
          />
          <StatCard 
            label="Total Hours" 
            value="1,524" 
            icon="⏱️"
            delay={100}
            variant="white"
          />
          <StatCard 
            label="Projects" 
            value="12" 
            icon="🎬"
            delay={200}
            variant="white"
          />
          <StatCard 
            label="Water Bottles" 
            value="381" 
            icon="💧"
            delay={300}
            variant="yellow"
          />
        </div>
      </div>
    </RecapSlide>
  );
};
