import { RecapSlide } from "./RecapSlide";
import { LocationData } from "@/types/recap";

interface HotSpotsSlideProps {
  locations: LocationData;
}

export const HotSpotsSlide = ({ locations }: HotSpotsSlideProps) => {
  return (
    <RecapSlide variant="dark">
      <div className="max-w-2xl w-full space-y-8">
        <h2 className="text-4xl font-black text-center mb-8 text-calltime-yellow animate-fade-in">
          Your Production Hot Spots
        </h2>
        
        {/* Simplified map visualization */}
        <div className="relative h-96 bg-white/10 rounded-3xl overflow-hidden backdrop-blur animate-scale-in" style={{ animationDelay: "200ms" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-7xl">📍</div>
              <div className="text-white">
                <div className="text-3xl font-black mb-2">
                  {locations.primaryLocation.city}, {locations.primaryLocation.state}
                </div>
                <div className="text-lg text-white/70">{locations.primaryLocation.percentage}% of your shoots</div>
              </div>
            </div>
          </div>
          
          {/* Heat spot indicators */}
          <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-calltime-yellow/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-calltime-orange/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "200ms" }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-calltime-yellow/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "400ms" }}></div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="text-center">
            <div className="text-2xl font-black text-calltime-yellow mb-1">
              {locations.primaryLocation.daysWorked}
            </div>
            <div className="text-sm text-white/70">
              Days in {locations.primaryLocation.city}
            </div>
          </div>
          {locations.secondaryLocations.length > 0 && (
            <div className="text-center">
              <div className="text-2xl font-black text-calltime-yellow mb-1">
                {locations.secondaryLocations[0].daysWorked}
              </div>
              <div className="text-sm text-white/70">
                Days in {locations.secondaryLocations[0].city}
              </div>
            </div>
          )}
          <div className="text-center">
            <div className="text-2xl font-black text-calltime-yellow mb-1">
              {locations.onLocationDays}
            </div>
            <div className="text-sm text-white/70">On Location</div>
          </div>
        </div>
      </div>
    </RecapSlide>
  );
};
