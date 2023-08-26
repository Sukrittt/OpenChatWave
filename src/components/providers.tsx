"use client";
import { ReactNode, useState } from "react";
import { httpBatchLink } from "@trpc/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { trpc } from "@/trpc/client";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
