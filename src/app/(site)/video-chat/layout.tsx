import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Chat",
  description:
    "Connect and collaborate seamlessly through our innovative video chat platform. Create virtual rooms for interactive video sessions or effortlessly join conversations using unique room IDs.",
};

export default function VideoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
