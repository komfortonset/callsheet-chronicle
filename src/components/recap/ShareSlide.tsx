import { RecapSlide } from "./RecapSlide";
import { Button } from "@/components/ui/button";
import { Share2, Instagram, Twitter, Download } from "lucide-react";
import logo from "@/assets/calltime-logo.png";
import html2canvas from "html2canvas";
import { toast } from "sonner";

export const ShareSlide = () => {
  const handleDownloadSlide = async () => {
    try {
      toast.info("Generating image...");
      
      // Capture the entire viewport
      const canvas = await html2canvas(document.body, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: window.innerWidth,
        height: window.innerHeight,
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Failed to generate image");
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `calltime-wrapped-2025-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("Slide downloaded!");
      });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download slide");
    }
  };

  const handleShareTwitter = () => {
    const text = "Check out my Calltime Wrapped 2025! #CalltimeWrapped2025";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleShareInstagram = () => {
    toast.info("Download the slide and share it to your Instagram story!");
    handleDownloadSlide();
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Calltime Wrapped 2025",
          text: "Check out my Calltime Wrapped 2025!",
          url: window.location.href,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast.error("Failed to share");
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

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
            onClick={handleDownloadSlide}
            className="w-full max-w-sm bg-calltime-black text-calltime-yellow hover:bg-calltime-black/90 text-lg font-bold py-6 rounded-2xl"
          >
            <Download className="mr-2 h-5 w-5" />
            Download This Slide
          </Button>

          <Button 
            size="lg" 
            onClick={handleShareInstagram}
            variant="outline"
            className="w-full max-w-sm border-2 border-calltime-black text-calltime-black hover:bg-calltime-black/10 text-lg font-bold py-6 rounded-2xl"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Share to Instagram Story
          </Button>
          
          <Button 
            size="lg" 
            onClick={handleWebShare}
            variant="outline"
            className="w-full max-w-sm border-2 border-calltime-black text-calltime-black hover:bg-calltime-black/10 text-lg font-bold py-6 rounded-2xl"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Link
          </Button>
          
          <Button 
            size="lg" 
            onClick={handleShareTwitter}
            variant="outline"
            className="w-full max-w-sm border-2 border-calltime-black text-calltime-black hover:bg-calltime-black/10 text-lg font-bold py-6 rounded-2xl"
          >
            <Twitter className="mr-2 h-5 w-5" />
            Share to Twitter
          </Button>
        </div>
        
        <p className="text-sm text-calltime-black/60 mt-8 mb-32 animate-fade-in" style={{ animationDelay: "600ms" }}>
          #CW2025
        </p>
      </div>
    </RecapSlide>
  );
};
