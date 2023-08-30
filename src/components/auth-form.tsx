"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type LoadingState = "google" | "github";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<LoadingState | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading("google");

    try {
      await signIn("google");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(null);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading("github");

    try {
      await signIn("github");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="grid gap-y-4 w-full h-full">
      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        type="button"
        disabled={isLoading === "google"}
      >
        {isLoading === "google" ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <Button
        onClick={handleGithubLogin}
        variant="outline"
        type="button"
        disabled={isLoading === "github"}
      >
        {isLoading === "github" ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
};

export default AuthForm;
