import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BrainIcon } from "./icons";
import { cn } from "@/lib/utils";
import api from "@/lib/axios";

export type AuthMode = "signin" | "signup";

export interface AuthSuccessData {
  username: string;
  token?: string;
}

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultMode?: AuthMode;
  onAuthSuccess?: (mode: AuthMode, data: AuthSuccessData) => void;
}

export function AuthModal({
  open,
  onClose,
  defaultMode = "signin",
  onAuthSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync mode when defaultMode prop changes or modal opens
  useEffect(() => {
    if (open) {
      setMode(defaultMode);
      setUsername("");
      setPassword("");
      setShowPassword(false);
      setErrors({});
      setGeneralError(null);
      setSuccessMessage(null);
      setIsLoading(false);
    }
  }, [open, defaultMode]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isSignIn = mode === "signin";

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    setGeneralError(null);
    setSuccessMessage(null);
  };

  const validateForm = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
      newErrors.username = "Only letters, numbers, and underscores allowed";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const name=username.trim();
      if(!isSignIn){
        await api.post("/signup",{username:name,password});
      }
      const response=await api.post("/signin",{username:name,password});


      setSuccessMessage(
        isSignIn
          ? "Successfully signed in!"
          : "Account created successfully! Signing you in..."
      );

      

      setTimeout(() => {
        onAuthSuccess?.(mode, {username:name,token:response.data.token});
        onClose();
      }, 700);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Authentication failed. Please try again.";
      setGeneralError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <Card
        className="relative w-full max-w-[430px] rounded-2xl border border-border bg-card shadow-2xl text-card-foreground transition-all duration-200 animate-in zoom-in-95 overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Branding, Titles, and Close Button */}
        <CardHeader className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 shrink-0">
                <BrainIcon size={24} className="stroke-[2.2]" />
              </div>
              <div>
                <CardTitle
                  id="auth-modal-title"
                  className="text-xl font-bold tracking-tight text-foreground"
                >
                  {isSignIn ? "Welcome Back" : "Create Account"}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-0.5">
                  {isSignIn
                    ? "Enter your credentials to access your second brain"
                    : "Sign up to start organizing and saving your knowledge"}
                </CardDescription>
              </div>
            </div>

            <CardAction className="static">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </CardAction>
          </div>
        </CardHeader>

        {/* Content Body */}
        <CardContent className="px-6 pb-6 pt-0 space-y-4">
          {/* Segmented Mode Switcher (Sign In / Sign Up) */}
          <div className="grid grid-cols-2 p-1 bg-muted/70 rounded-xl border border-border/50 text-xs font-medium">
            <button
              type="button"
              onClick={() => handleModeChange("signin")}
              className={cn(
                "py-2 rounded-lg transition-all duration-150 text-center font-medium cursor-pointer",
                isSignIn
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("signup")}
              className={cn(
                "py-2 rounded-lg transition-all duration-150 text-center font-medium cursor-pointer",
                !isSignIn
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign Up
            </button>
          </div>

          {/* Feedback messages */}
          {generalError && (
            <div className="p-3 text-xs rounded-xl bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-2 animate-in fade-in duration-150">
              <AlertCircle size={15} className="shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 text-xs rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle2 size={15} className="shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Authentication Form with Username & Password fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field 1: Username */}
            <div className="space-y-1.5">
              <label
                htmlFor="auth-username"
                className="block text-xs font-medium text-foreground"
              >
                Username <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="auth-username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) {
                      setErrors((prev) => ({ ...prev, username: undefined }));
                    }
                  }}
                  placeholder="e.g. johndoe"
                  autoComplete="username"
                  className={cn(
                    "h-10 pl-9 pr-3 text-sm rounded-xl bg-background border-input focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-colors",
                    errors.username && "border-destructive focus-visible:ring-destructive/20"
                  )}
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              {errors.username && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Field 2: Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="auth-password"
                className="block text-xs font-medium text-foreground"
              >
                Password <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  placeholder="••••••••"
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  className={cn(
                    "h-10 pl-9 pr-10 text-sm rounded-xl bg-background border-input focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-colors",
                    errors.password && "border-destructive focus-visible:ring-destructive/20"
                  )}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-0.5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Action Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer mt-5"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{isSignIn ? "Signing In..." : "Creating Account..."}</span>
                </>
              ) : (
                <>
                  <span>{isSignIn ? "Sign In" : "Create Account"}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        {/* Card Footer with Toggle Link */}
        <CardFooter className="flex items-center justify-center text-xs text-muted-foreground border-t border-border/60 bg-muted/30 py-3.5 px-6 rounded-b-2xl">
          {isSignIn ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeChange("signup")}
                className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline cursor-pointer transition-colors"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeChange("signin")}
                className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline cursor-pointer transition-colors"
              >
                Sign in
              </button>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default AuthModal;
