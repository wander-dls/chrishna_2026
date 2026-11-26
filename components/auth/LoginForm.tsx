"use client";
import { useLoginForm } from "./hooks/useLoginForm";
import { LoginFormProps } from "@/types/auth";

// Shadcn
import { Button } from "../ui/button";

export default function LoginForm({ redirectTo = "/admin" }: LoginFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isSubmitted,
    error,
    handleSubmit,
  } = useLoginForm({ redirectTo });
  return <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 sm:grid-cols-2 min-h-screen overflow-hidden ">
        {/* Lerft Side */}
        <div className="flex items-center justify-center bg-white">
          <div className="bg-chrishna-background min-h-screen p-8">
            <div className="bg-chrishna-surface rounded-xl p-8 border border-chrishna-border">
              <h1 className="text-chrishna-foreground text-3xl">
                Chrishna Photography
              </h1>

              <p className="text-chrishna-muted mt-2">
                Quiet Luxury Design System
              </p>

              <button className="bg-chrishna-primary hover:bg-chrishna-primary-hover text-white rounded-md px-6 py-3 mt-6">
                back
              </button>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex items-center justify-center bg-chrishna-border">Right Side</div>
    </div>
  </form>;
}

