import { ReactNode } from "react";

import { Shell } from "@/components/shell";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Shell>
        <Navbar />
        {children}
      </Shell>
      <Footer />
    </div>
  );
}
