import { getAuthSession } from "@/lib/auth";
import { serverClient } from "@/trpc/server-client";
import { AddMessages } from "@/components/add-messages";
import { DisplayMessages } from "@/components/messages/display-messages";

export default async function Home() {
  const session = await getAuthSession();
  const messages = await serverClient.getMessages();

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] border rounded-xl">
      <DisplayMessages initialData={messages} session={session} />
      {session && (
        <div className="relative p-3">
          <AddMessages user={session.user} />
        </div>
      )}
    </div>
  );
}
