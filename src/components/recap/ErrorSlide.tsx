import { RecapSlide } from "./RecapSlide";
import { Button } from "@/components/ui/button";

interface ErrorSlideProps {
  onRetry: () => void;
}

export const ErrorSlide = ({ onRetry }: ErrorSlideProps) => {
  return (
    <RecapSlide>
      <div className="text-center space-y-8 max-w-md">
        <div className="text-7xl mb-4">😕</div>
        <h2 className="text-4xl font-black">
          Oops! Something Went Wrong
        </h2>
        <p className="text-lg text-muted-foreground">
          We couldn't load your wrapped data. Please try again.
        </p>
        <Button 
          onClick={onRetry}
          size="lg"
          className="bg-calltime-yellow text-calltime-black hover:bg-calltime-yellow/90 font-bold rounded-2xl"
        >
          Try Again
        </Button>
      </div>
    </RecapSlide>
  );
};
