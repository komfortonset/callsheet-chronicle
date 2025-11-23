import { RecapSlide } from "./RecapSlide";
import { Archetype } from "@/types/recap";

const archetypeIcons: Record<Archetype['type'], string> = {
  'specialist': '🎯',
  'generalist': '🌟',
  'rising-star': '🚀',
  'veteran': '👑',
  'collaborator': '🤝',
};

interface ArchetypeSlideProps {
  archetype: Archetype;
}

export const ArchetypeSlide = ({ archetype }: ArchetypeSlideProps) => {
  return (
    <RecapSlide variant="dark">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="animate-scale-in">
          <div className="text-8xl mb-6">{archetypeIcons[archetype.type]}</div>
          <h2 className="text-5xl font-black mb-4 text-calltime-yellow">
            {archetype.title}
          </h2>
          <p className="text-2xl text-white/80 max-w-lg mx-auto">
            {archetype.description}
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mt-12 animate-fade-in" style={{ animationDelay: "400ms" }}>
          {archetype.stats.map((stat, index) => (
            <div key={index} className="bg-white/10 rounded-2xl p-6 backdrop-blur">
              <div className="text-3xl font-black text-calltime-yellow mb-2">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </RecapSlide>
  );
};
