"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { trpc } from "@/trpc/client";

export const AddMessages = ({ userId }: { userId: string }) => {
  const [message, setMessage] = useState("");

  const router = useRouter();

  const processMessageSend = trpc.addMessage.useMutation({
    onSuccess: () => {
      toast.success("Message sent!");
      router.refresh();
      setMessage("");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="relative">
        <Textarea
          value={message}
          className="min-h-[3.5rem]"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !processMessageSend.isLoading
            ) {
              e.preventDefault();
              processMessageSend.mutate({ text: message, userId });
            }
          }}
          placeholder="Type your message here."
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          size="sm"
          className="w-fit absolute right-3 top-3"
          disabled={processMessageSend.isLoading}
          onClick={() => processMessageSend.mutate({ text: message, userId })}
        >
          {processMessageSend.isLoading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
