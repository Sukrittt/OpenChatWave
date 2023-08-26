"use client";
import { signIn } from "next-auth/react";

const AuthForm = () => {
  return (
    <div>
      <button onClick={async () => await signIn("github")}>Github</button>
    </div>
  );
};

export default AuthForm;
