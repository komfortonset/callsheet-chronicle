import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface RecapCarouselProps {
  slides: React.ReactNode[];
}
export const RecapCarousel = ({
  slides
}: RecapCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;

    // Limit drag at edges
    if (currentSlide === 0 && diff < 0 || currentSlide === slides.length - 1 && diff > 0) {
      setDragOffset(diff * 0.2); // Reduced movement at edges
    } else {
      setDragOffset(diff);
    }
    setTouchEnd(currentTouch);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide();
    } else if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);
  return <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background select-none" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {/* Slides */}
      <div className={cn("flex h-full", isDragging ? "transition-none" : "transition-transform duration-500 ease-out")} style={{
      transform: `translateX(calc(-${currentSlide * 100}% - ${dragOffset}px))`
    }}>
        {slides.map((slide, index) => <div key={index} className="min-w-full h-full">
            {slide}
          </div>)}
      </div>

      {/* Progress bars at top (Instagram style) */}
      <div className="absolute top-4 left-4 right-4 flex gap-2 z-50">
        {slides.map((_, index) => <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur">
            <div className={cn("h-full bg-white rounded-full transition-all duration-300", index < currentSlide && "w-full", index === currentSlide && "w-full animate-progress", index > currentSlide && "w-0")} />
          </div>)}
      </div>

      {/* Tap zones for quick navigation (Instagram style) */}
      <div className="absolute inset-0 flex pointer-events-none z-40">
        <button onClick={prevSlide} disabled={currentSlide === 0} className="w-1/3 h-full pointer-events-auto opacity-0 disabled:pointer-events-none" aria-label="Previous slide" />
        <div className="w-1/3 h-full" /> {/* Middle zone - no action */}
        <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} aria-label="Next slide" className="w-1/3 h-full pointer-events-auto opacity-0 disabled:pointer-events-none text-center" />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex absolute bottom-8 left-0 right-0 items-center justify-center gap-4 px-8 z-50">
        <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentSlide === 0} className="rounded-full bg-white/90 backdrop-blur border-calltime-black/20 disabled:opacity-30">
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Progress dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={cn("h-2 rounded-full transition-all duration-300", currentSlide === index ? "w-8 bg-calltime-yellow" : "w-2 bg-calltime-black/30")} aria-label={`Go to slide ${index + 1}`} />)}
        </div>

        <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="rounded-full bg-white/90 backdrop-blur border-calltime-black/20 disabled:opacity-30">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Swipe hint (mobile only, first slide) */}
      {currentSlide === 0 && <div className="md:hidden absolute bottom-8 left-0 right-0 text-center animate-fade-in z-50">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-sm text-calltime-black font-semibold">
            <span>👈 Swipe to explore</span>
          </div>
        </div>}
    </div>;
};