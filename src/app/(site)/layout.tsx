import { Shell } from "@/components/shell";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <Shell>{children}</Shell>;
}
