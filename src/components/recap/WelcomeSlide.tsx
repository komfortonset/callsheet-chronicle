import { RecapSlide } from "./RecapSlide";

export const WelcomeSlide = () => {
  return (
    <RecapSlide variant="gradient">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="text-7xl mb-4 animate-scale-in" style={{ animationDelay: "200ms" }}>
          🎬
        </div>
        <h1 className="text-6xl font-black text-calltime-black animate-slide-up" style={{ animationDelay: "400ms" }}>
          Your 2025
          <br />
          Calltime Wrapped
        </h1>
        <p className="text-2xl text-calltime-black/80 max-w-md mx-auto animate-fade-in" style={{ animationDelay: "600ms" }}>
          A year of dedication, collaboration, and growth on set
        </p>
      </div>
    </RecapSlide>
  );
};
