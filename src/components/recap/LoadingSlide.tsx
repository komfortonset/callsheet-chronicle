import { RecapSlide } from "./RecapSlide";

export const LoadingSlide = () => {
  return (
    <RecapSlide variant="gradient">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="text-7xl mb-4 animate-pulse">🎬</div>
        <h2 className="text-4xl font-black text-calltime-black">
          Generating Your Wrapped...
        </h2>
        <div className="flex gap-2 justify-center">
          <div className="w-3 h-3 bg-calltime-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-calltime-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-calltime-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </RecapSlide>
  );
};
