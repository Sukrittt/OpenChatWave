import Link from "next/link";

import { getAuthSession } from "@/lib/auth";
import { serverClient } from "@/trpc/server-client";
import { buttonVariants } from "@/components/ui/button";
import { AddMessages } from "@/components/add-messages";
import { DisplayMessages } from "@/components/messages/display-messages";

export default async function Home() {
  const session = await getAuthSession();
  const messages = await serverClient.getMessages();

  return (
    <div className="flex flex-col gap-y-4 h-[calc(100vh-8rem)]">
      <DisplayMessages data={messages} session={session} />
      {session && (
        <div className="relative">
          <AddMessages userId={session.user.id} />
        </div>
      )}
    </div>
  );
}
