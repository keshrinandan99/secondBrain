import { Button } from "@/components/ui/button";
import { Plus, Share2, LogIn, User, LogOut } from "lucide-react";

type ButtonsProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  setIsShareModalOpen?: (isOpen: boolean) => void;
  setIsAuthModalOpen?: (isOpen: boolean) => void;
  currentUser?: string | null;
  onLogout?: () => void;
};

function Buttons({
  setIsModalOpen,
  setIsShareModalOpen,
  setIsAuthModalOpen,
  currentUser,
  onLogout,
}: ButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Sign In / User Status Button */}
      {currentUser ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-700 dark:text-indigo-300">
            <User size={14} className="text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold">{currentUser}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="h-9 px-2.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl cursor-pointer"
            title="Log out"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="lg"
          className="px-4 py-2.5 flex items-center gap-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-muted"
          onClick={() => setIsAuthModalOpen?.(true)}
        >
          <LogIn size={16} className="text-muted-foreground" />
          <span>Sign In</span>
        </Button>
      )}

      {/* Share Brain Button */}
      <Button
        variant="secondary"
        size="lg"
        className="px-4 py-2.5 flex items-center gap-2 rounded-xl text-sm font-medium cursor-pointer"
        onClick={() => setIsShareModalOpen?.(true)}
      >
        <Share2 size={16} className="text-muted-foreground" />
        Share Brain
      </Button>

      {/* Add Content Button */}
      <Button
        variant="default"
        size="lg"
        className="px-4 py-2.5 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium shadow-sm cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={16} />
        Add Content
      </Button>
    </div>
  );
}

export default Buttons;