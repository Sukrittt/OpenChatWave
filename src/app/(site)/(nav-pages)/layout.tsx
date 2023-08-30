import { ReactNode } from "react";

import { Shell } from "@/components/shell";
import { Navbar } from "@/components/layout/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Shell>
      <Navbar />
      {children}
    </Shell>
  );
}
