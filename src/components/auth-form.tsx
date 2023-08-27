"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const AuthForm = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <Button onClick={async () => await signIn("github")}>Github</Button>
      {/* <Button onClick={async () => await signIn("google")}>Google</Button> */}
    </div>
  );
};

export default AuthForm;
