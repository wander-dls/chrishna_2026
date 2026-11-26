"use client";
import { useState } from "react";
import type { SubmitEvent } from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AUTH_MESSAGES } from "@/constants/auth"

interface UseLoginFormOptions {
  redirectTo?: string;
}

export function useLoginForm({
  redirectTo = "/admin",
}: UseLoginFormOptions = {}) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")

    const normalizedEmail = email.trim().toLowerCase()

    if(!normalizedEmail || !password) {
      setError(AUTH_MESSAGES.REQUIRED_CREDENTIALS)
      return
    }

    setIsSubmitting(true)

    try {
      const result = await signIn("credentials", {
        email: normalizedEmail,
        password,
        redirect: false,
        redirectTo
      })

      if(!result?.ok || result.error) {
        setError(AUTH_MESSAGES.INVALID_CREDENTIALS) 
        return
      }

      router.push(result.url ?? redirectTo)
      router.refresh()
    } catch {
      setError(AUTH_MESSAGES.GENERIC_ERROR)
    } finally {
      setIsSubmitting(false)
    }

    if(isSubmitting) return
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isSubmitting,
    error,
    handleSubmit

  }
}
