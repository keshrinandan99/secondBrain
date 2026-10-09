import  { useState, useEffect } from "react";
import { X, Copy, Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";

export interface ShareBrainModalProps {
  open: boolean;
  onClose: () => void;
  itemCount?: number;
  shareUrl?: string;
  onShare?: () => void;
}

export function ShareBrainModal({
  open,
  onClose,
  itemCount = 3,
  shareUrl = window.location.href,
  onShare,
}: ShareBrainModalProps) {
  const [copied, setCopied] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Reset copied state when modal opens
  useEffect(() => {
    if (open) {
      setCopied(false);
    }
  }, [open]);

  if (!open) return null;

  const handleShareClick = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error("Failed to copy share link: ", err);
    }
    onShare?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <Card
        className="relative w-full max-w-[440px] rounded-2xl border border-border bg-card p-6 shadow-2xl text-card-foreground transition-all duration-200 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close button */}
        <CardHeader className="p-0 flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl font-bold tracking-tight text-foreground">
            Share Your Second Brain
          </CardTitle>
          <CardAction className="static">
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </CardAction>
        </CardHeader>

        {/* Content Body */}
        <CardContent className="p-0 space-y-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Share your entire collection of notes, documents, tweets, and
            videos with others. They&apos;ll be able to import your content into
            their own Second Brain.
          </p>

          {/* Share Action Button */}
          <Button
            type="button"
            onClick={handleShareClick}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2.5 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={18} className="stroke-[2.5]" />
                Link Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy size={18} className="stroke-[2.2]" />
                Share Brain
              </>
            )}
          </Button>

          {/* Items count note */}
          <p className="text-center text-xs text-muted-foreground pt-1">
            {itemCount} {itemCount === 1 ? "item" : "items"} will be shared
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShareBrainModal;
