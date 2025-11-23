import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Gift, Loader2 } from "lucide-react";
import { Collaborator } from "@/types/recap";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SendGiftDialogProps {
  collaborators: Collaborator[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SendGiftDialog = ({ collaborators, open, onOpenChange }: SendGiftDialogProps) => {
  const [selectedCollaborators, setSelectedCollaborators] = useState<Set<string>>(new Set());
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const toggleCollaborator = (name: string) => {
    const newSelected = new Set(selectedCollaborators);
    if (newSelected.has(name)) {
      newSelected.delete(name);
    } else {
      newSelected.add(name);
    }
    setSelectedCollaborators(newSelected);
  };

  const selectAll = () => {
    setSelectedCollaborators(new Set(collaborators.map(c => c.name)));
  };

  const clearAll = () => {
    setSelectedCollaborators(new Set());
  };

  /**
   * Backend Integration Point:
   * Replace this function with actual payment link generation
   * 
   * Expected flow:
   * 1. Call your backend API with selected collaborator details
   * 2. Backend generates personalized Stripe/payment links for each collaborator
   * 3. Backend sends email with gift link to each collaborator
   * 4. Return success/failure status
   * 
   * Example API call:
   * const response = await fetch('/api/gifts/send', {
   *   method: 'POST',
   *   headers: { 'Authorization': `Bearer ${token}` },
   *   body: JSON.stringify({
   *     collaborators: selectedCollabs,
   *     year: 2025,
   *     senderUserId: userId
   *   })
   * });
   */
  const handleSendGifts = async () => {
    if (selectedCollaborators.size === 0) {
      toast({
        title: "No collaborators selected",
        description: "Please select at least one collaborator to send a gift to.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      // Mock delay - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // TODO: Backend team - Replace this with actual API call
      // const selectedCollabs = collaborators.filter(c => selectedCollaborators.has(c.name));
      // const response = await sendGiftLinks(selectedCollabs);

      toast({
        title: "Gifts sent! 🎁",
        description: `Successfully sent thank you gifts to ${selectedCollaborators.size} collaborator${selectedCollaborators.size > 1 ? 's' : ''}.`,
      });

      setSelectedCollaborators(new Set());
      onOpenChange(false);
    } catch (error) {
      console.error("Error sending gifts:", error);
      toast({
        title: "Failed to send gifts",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Gift className="h-6 w-6 text-calltime-yellow" />
            Send Thank You Gifts
          </DialogTitle>
          <DialogDescription>
            Select collaborators to send personalized thank you gifts. They'll receive a custom link to claim their gift.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Select all/none */}
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-sm font-medium">
              {selectedCollaborators.size} of {collaborators.length} selected
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={selectAll}
                className="text-xs"
              >
                Select All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-xs"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Collaborator list */}
          <div className="max-h-80 overflow-y-auto space-y-2">
            {collaborators.map((collab) => {
              const isSelected = selectedCollaborators.has(collab.name);
              return (
                <div
                  key={collab.name}
                  onClick={() => toggleCollaborator(collab.name)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                    isSelected 
                      ? "border-calltime-yellow bg-calltime-yellow/5" 
                      : "border-border hover:border-calltime-yellow/50"
                  )}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleCollaborator(collab.name)}
                    className="data-[state=checked]:bg-calltime-yellow data-[state=checked]:border-calltime-yellow"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{collab.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {collab.role} • {collab.daysWorkedTogether} days together
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Send button */}
          <Button
            onClick={handleSendGifts}
            disabled={selectedCollaborators.size === 0 || isSending}
            className="w-full bg-calltime-yellow text-calltime-black hover:bg-calltime-yellow/90 font-bold text-lg py-6 rounded-2xl"
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Gift className="mr-2 h-5 w-5" />
                Send {selectedCollaborators.size > 0 ? `${selectedCollaborators.size} ` : ''}Gift{selectedCollaborators.size !== 1 ? 's' : ''}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Each collaborator will receive an email with a personalized gift link
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
