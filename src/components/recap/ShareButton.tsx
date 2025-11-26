import { Button } from "@/components/ui/button";
import { Share2, Instagram, Twitter, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ShareButton = () => {
  const handleDownloadSlide = async () => {
    try {
      toast.info("Generating image...");
      
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="fixed bottom-24 left-1/2 -translate-x-1/2 md:bottom-20 z-50 bg-background/90 backdrop-blur border-2 border-calltime-black text-calltime-black hover:bg-calltime-black hover:text-calltime-yellow rounded-full shadow-lg"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleDownloadSlide}>
          <Download className="mr-2 h-4 w-4" />
          Download This Slide
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareInstagram}>
          <Instagram className="mr-2 h-4 w-4" />
          Share to Instagram
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleWebShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareTwitter}>
          <Twitter className="mr-2 h-4 w-4" />
          Share to Twitter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
