import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RecapSlideProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "dark";
}

export const RecapSlide = ({ children, className, variant = "default" }: RecapSlideProps) => {
  return (
    <div
      className={cn(
        "relative w-full h-screen flex flex-col items-center justify-center p-8 overflow-hidden",
        variant === "gradient" && "bg-gradient-primary",
        variant === "dark" && "bg-calltime-black text-white",
        variant === "default" && "bg-background",
        className
      )}
    >
      {children}
    </div>
  );
};
