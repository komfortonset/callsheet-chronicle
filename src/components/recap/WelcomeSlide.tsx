import { RecapSlide } from "./RecapSlide";
import logo from "@/assets/calltime-logo.png";
export const WelcomeSlide = () => {
  return <RecapSlide variant="dark">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="mb-4 animate-scale-in flex justify-center" style={{
        animationDelay: "200ms"
      }}>
          <img src={logo} alt="Calltime Logo" className="w-32 h-32 object-contain" />
        </div>
        <h1 style={{
        animationDelay: "400ms"
      }} className="text-6xl animate-slide-up text-left px-[30px] font-extrabold bg-calltime-yellow text-gray-600">YOUR YEAR 
ON SET    2025         <br />
          Calltime Wrapped
        </h1>
        <p style={{
        animationDelay: "600ms"
      }} className="text-white/80 max-w-md mx-auto animate-fade-in text-sm">
          A year of dedication, collaboration, and growth on set
        </p>
      </div>
    </RecapSlide>;
};