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
        <h1 className="text-6xl font-black text-white animate-slide-up" style={{
        animationDelay: "400ms"
      }}>
          Your 2025
CALLTIME
"2025 WRAPPED          







    
          <br />
          Calltime Wrapped
        </h1>
        <p className="text-2xl text-white/80 max-w-md mx-auto animate-fade-in" style={{
        animationDelay: "600ms"
      }}>
          A year of dedication, collaboration, and growth on set
        </p>
      </div>
    </RecapSlide>;
};