import Link from "next/link";

import { getAuthSession } from "@/lib/auth";
import { serverClient } from "@/trpc/server-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { AddMessages } from "@/components/add-messages";

export default async function Home() {
  const session = await getAuthSession();
  const messages = await serverClient.getMessages();

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-center text-3xl">
        Real time messages with websockets
      </h1>
      {session ? (
        <>
          <p>Hello there, {`${session.user.name}`}</p>
          <AddMessages userId={session.user.id} />
        </>
      ) : (
        <Link
          href="/sign-in"
          className={buttonVariants({ variant: "secondary" })}
        >
          Sign In
        </Link>
      )}
      <div className="flex flex-col gap-y-2">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No messages.
          </p>
        ) : (
          messages.map((message) => (
            <div className="border p-2 rounded-md" key={message.id}>
              {message.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
