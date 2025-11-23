import { useState } from "react";
import { RecapSlide } from "./RecapSlide";
import { Collaborator } from "@/types/recap";
import { Button } from "@/components/ui/button";
import { SendGiftDialog } from "./SendGiftDialog";
import { Gift } from "lucide-react";

interface TopCollaboratorsSlideProps {
  collaborators: Collaborator[];
}

export const TopCollaboratorsSlide = ({ collaborators }: TopCollaboratorsSlideProps) => {
  const [giftDialogOpen, setGiftDialogOpen] = useState(false);
  
  // Show top 5 collaborators
  const topCollaborators = collaborators.slice(0, 5);
  return (
    <RecapSlide>
      <div className="max-w-2xl w-full space-y-8">
        <h2 className="text-4xl font-black text-center mb-8 animate-fade-in">
          Your Top Collaborators
        </h2>
        
        <div className="space-y-4">
          {topCollaborators.map((collab, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-card flex items-center justify-between animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-black text-calltime-black">
                  {index + 1}
                </div>
                <div>
                  <div className="font-bold text-lg">{collab.name}</div>
                  <div className="text-muted-foreground text-sm">{collab.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-calltime-yellow">{collab.daysWorkedTogether}</div>
                <div className="text-sm text-muted-foreground">days</div>
              </div>
            </div>
          ))}
        </div>

        {/* Send Gifts Button */}
        <Button
          onClick={() => setGiftDialogOpen(true)}
          className="w-full max-w-md bg-gradient-primary text-calltime-black hover:opacity-90 font-bold text-lg py-6 rounded-2xl shadow-glow animate-fade-in"
          style={{ animationDelay: "500ms" }}
        >
          <Gift className="mr-2 h-5 w-5" />
          Send Thank You Gifts
        </Button>
      </div>

      {/* Gift Dialog */}
      <SendGiftDialog
        collaborators={collaborators}
        open={giftDialogOpen}
        onOpenChange={setGiftDialogOpen}
      />
    </RecapSlide>
  );
};
