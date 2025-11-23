import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  delay?: number;
  variant?: "yellow" | "white" | "black";
}

export const StatCard = ({ label, value, icon, delay = 0, variant = "white" }: StatCardProps) => {
  return (
    <div
      className={cn(
        "rounded-3xl p-6 shadow-card animate-scale-in flex flex-col items-center justify-center min-h-[180px]",
        variant === "yellow" && "bg-calltime-yellow text-calltime-black",
        variant === "white" && "bg-white text-calltime-black",
        variant === "black" && "bg-calltime-black text-white border-2 border-calltime-yellow"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <div className="text-6xl font-black mb-2 animate-count-up" style={{ animationDelay: `${delay + 200}ms` }}>
        {value}
      </div>
      <div className="text-lg font-semibold text-center opacity-80">{label}</div>
    </div>
  );
};
