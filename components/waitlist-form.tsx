"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Mail, Loader2 } from "lucide-react";

interface WaitlistFormProps {
  variant?: "default" | "white";
}

export function WaitlistForm({ variant = "default" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("waitlist_emails")
        .insert([{ 
          email: email.trim().toLowerCase(),
          created_at: new Date().toISOString()
        }]);

      if (error) {
        if (error.code === "23505") {
          toast.error("You're already on our waitlist!");
        } else {
          console.error("Waitlist signup error:", error);
          toast.error("Something went wrong. Please try again.");
        }
        return;
      }

      setIsSuccess(true);
      toast.success("You're on the waitlist! We'll be in touch soon.");
      setEmail("");
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
        variant === "white" 
          ? "bg-white/20 text-white" 
          : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
      }`}>
        <Mail className="w-5 h-5" />
        <span className="font-medium">Thanks! You&apos;re on the waitlist.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        className={
          variant === "white"
            ? "bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white"
            : ""
        }
      />
      <Button 
        type="submit" 
        size="lg" 
        disabled={isLoading}
        className={
          variant === "white"
            ? "bg-white text-blue-600 hover:bg-white/90"
            : ""
        }
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Joining...
          </>
        ) : (
          "Join Waitlist"
        )}
      </Button>
    </form>
  );
}