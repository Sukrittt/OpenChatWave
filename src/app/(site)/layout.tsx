import { Shell } from "@/components/shell";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <Shell className="min-h-screen">{children}</Shell>;
}
