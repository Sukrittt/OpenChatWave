"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { trpc } from "@/trpc/client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPicker } from "@/components/emoji-picker";

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
      <div className="flex justify-end"></div>
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
        <div className="absolute right-[72px] top-[17px]">
          <EmojiPicker onChange={(emoji) => setMessage(message + emoji)} />
        </div>
        <Button
          className="w-fit absolute right-3 top-[9px] rounded-xl"
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
