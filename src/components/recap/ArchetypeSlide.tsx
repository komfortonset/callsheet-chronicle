import { RecapSlide } from "./RecapSlide";

export const ArchetypeSlide = () => {
  return (
    <RecapSlide variant="dark">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="animate-scale-in">
          <div className="text-8xl mb-6">🎯</div>
          <h2 className="text-5xl font-black mb-4 text-calltime-yellow">
            You're a Specialist
          </h2>
          <p className="text-2xl text-white/80 max-w-lg mx-auto">
            You've mastered your craft, working consistently in your niche with precision and expertise
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mt-12 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
            <div className="text-3xl font-black text-calltime-yellow mb-2">92%</div>
            <div className="text-sm text-white/70">Same Department</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
            <div className="text-3xl font-black text-calltime-yellow mb-2">8</div>
            <div className="text-sm text-white/70">Repeat Crews</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
            <div className="text-3xl font-black text-calltime-yellow mb-2">5.2★</div>
            <div className="text-sm text-white/70">Avg. Rating</div>
          </div>
        </div>
      </div>
    </RecapSlide>
  );
};
