import { getAuthSession } from "@/lib/auth";
import { serverClient } from "@/trpc/server-client";
import { AddMessages } from "@/components/add-messages";
import { DisplayMessages } from "@/components/messages/display-messages";

export default async function Home() {
  const session = await getAuthSession();
  const messages = await serverClient.getMessages();

  return (
    <div className="flex flex-col gap-y-4 h-[calc(100vh-8rem)]">
      <DisplayMessages initialData={messages} session={session} />
      {session && (
        <div className="relative">
          <AddMessages user={session.user} />
        </div>
      )}
    </div>
  );
}
