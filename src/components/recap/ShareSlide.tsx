import { RecapSlide } from "./RecapSlide";
import { Button } from "@/components/ui/button";
import { Share2, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/calltime-logo.png";

export const ShareSlide = () => {
  return (
    <RecapSlide variant="gradient">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="animate-scale-in">
          <div className="mb-6 flex justify-center">
            <img src={logo} alt="Calltime Logo" className="w-24 h-24 object-contain" />
          </div>
          <h2 className="text-5xl font-black mb-4 text-calltime-black">
            That's a Wrap on 2025!
          </h2>
          <p className="text-2xl text-calltime-black/80 max-w-lg mx-auto">
            Share your year with the crew
          </p>
        </div>
        
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <Button 
            size="lg" 
            className="w-full max-w-sm bg-calltime-black text-calltime-yellow hover:bg-calltime-black/90 text-lg font-bold py-6 rounded-2xl"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Share to Instagram Story
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="w-full max-w-sm border-2 border-calltime-black text-calltime-black hover:bg-calltime-black/10 text-lg font-bold py-6 rounded-2xl"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share All Slides
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="w-full max-w-sm border-2 border-calltime-black text-calltime-black hover:bg-calltime-black/10 text-lg font-bold py-6 rounded-2xl"
          >
            <Twitter className="mr-2 h-5 w-5" />
            Share to Twitter
          </Button>
        </div>
        
        <p className="text-sm text-calltime-black/60 mt-8 animate-fade-in" style={{ animationDelay: "600ms" }}>
          #CalltimeWrapped2025
        </p>
      </div>
    </RecapSlide>
  );
};
