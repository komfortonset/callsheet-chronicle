import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Gift, Loader2, Check } from "lucide-react";
import { Collaborator } from "@/types/recap";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { GIFT_OPTIONS, GiftOption } from "@/types/gifts";

interface SendGiftDialogProps {
  collaborators: Collaborator[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SendGiftDialog = ({ collaborators, open, onOpenChange }: SendGiftDialogProps) => {
  const [giftSelections, setGiftSelections] = useState<Map<string, GiftOption['id']>>(new Map());
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const selectGiftForCollaborator = (name: string, giftId: GiftOption['id']) => {
    const newSelections = new Map(giftSelections);
    newSelections.set(name, giftId);
    setGiftSelections(newSelections);
  };

  const removeCollaborator = (name: string) => {
    const newSelections = new Map(giftSelections);
    newSelections.delete(name);
    setGiftSelections(newSelections);
  };

  const getTotalCost = () => {
    let total = 0;
    giftSelections.forEach((giftId) => {
      const gift = GIFT_OPTIONS.find(g => g.id === giftId);
      if (gift) total += gift.price;
    });
    return total;
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
    if (giftSelections.size === 0) {
      toast({
        title: "No gifts selected",
        description: "Please select a gift for at least one collaborator.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      // Mock delay - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // TODO: Backend team - Replace this with actual API call
      // const giftsToSend = Array.from(giftSelections.entries()).map(([name, giftId]) => ({
      //   collaborator: collaborators.find(c => c.name === name),
      //   giftId
      // }));
      // const response = await sendGiftLinks(giftsToSend);

      toast({
        title: "Gifts sent! 🎁",
        description: `Successfully sent ${giftSelections.size} gift${giftSelections.size > 1 ? 's' : ''}.`,
      });

      setGiftSelections(new Map());
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Gift className="h-6 w-6 text-calltime-yellow" />
            Send Thank You Gifts
          </DialogTitle>
          <DialogDescription>
            Choose a gift for each collaborator. They'll receive a personalized link to claim it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Collaborator list with gift selection */}
          <div className="space-y-4">
            {collaborators.map((collab) => {
              const selectedGift = giftSelections.get(collab.name);
              const hasGift = selectedGift !== undefined;
              
              return (
                <div
                  key={collab.name}
                  className={cn(
                    "p-4 rounded-lg border transition-all",
                    hasGift 
                      ? "border-calltime-yellow bg-calltime-yellow/5" 
                      : "border-border"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{collab.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {collab.role} • {collab.daysWorkedTogether} days together
                      </div>
                    </div>
                    {hasGift && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCollaborator(collab.name)}
                        className="text-xs text-muted-foreground"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  {/* Gift options */}
                  <div className="grid grid-cols-3 gap-2">
                    {GIFT_OPTIONS.map((gift) => {
                      const isSelected = selectedGift === gift.id;
                      return (
                        <button
                          key={gift.id}
                          onClick={() => selectGiftForCollaborator(collab.name, gift.id)}
                          className={cn(
                            "relative p-3 rounded-lg border-2 transition-all text-left",
                            isSelected
                              ? "border-calltime-yellow bg-calltime-yellow/10"
                              : "border-border hover:border-calltime-yellow/50"
                          )}
                        >
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 bg-calltime-yellow rounded-full p-1">
                              <Check className="h-3 w-3 text-calltime-black" />
                            </div>
                          )}
                          <div className="font-semibold text-sm mb-1">{gift.name}</div>
                          <div className="text-xs text-muted-foreground mb-2 line-clamp-1">
                            {gift.description}
                          </div>
                          <div className={cn(
                            "font-bold",
                            gift.price === 0 ? "text-green-500" : "text-foreground"
                          )}>
                            {gift.priceLabel}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary and send button */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                {giftSelections.size} gift{giftSelections.size !== 1 ? 's' : ''} selected
              </span>
              <span className="font-semibold text-lg">
                Total: ${getTotalCost().toFixed(2)}
              </span>
            </div>

            <Button
              onClick={handleSendGifts}
              disabled={giftSelections.size === 0 || isSending}
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
                  Send {giftSelections.size > 0 ? `${giftSelections.size} ` : ''}Gift{giftSelections.size !== 1 ? 's' : ''}
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Each collaborator will receive an email with a personalized gift link
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
