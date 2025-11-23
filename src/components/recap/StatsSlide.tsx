import { RecapSlide } from "./RecapSlide";
import { StatCard } from "./StatCard";
import { CareerStats } from "@/types/recap";

interface StatsSlideProps {
  stats: CareerStats;
}

export const StatsSlide = ({ stats }: StatsSlideProps) => {
  return (
    <RecapSlide>
      <div className="max-w-2xl w-full space-y-6">
        <h2 className="text-4xl font-black text-center mb-8 animate-fade-in">Your Year in Numbers</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            label="Days on Set" 
            value={stats.daysOnSet.toLocaleString()} 
            icon="📅"
            delay={0}
            variant="yellow"
          />
          <StatCard 
            label="Total Hours" 
            value={stats.totalHours.toLocaleString()} 
            icon="⏱️"
            delay={100}
            variant="white"
          />
          <StatCard 
            label="Projects" 
            value={stats.projectCount} 
            icon="🎬"
            delay={200}
            variant="white"
          />
          <StatCard 
            label="Water Bottles" 
            value={stats.waterBottlesConsumed.toLocaleString()} 
            icon="💧"
            delay={300}
            variant="yellow"
          />
        </div>
      </div>
    </RecapSlide>
  );
};
