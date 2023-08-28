"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { trpc } from "@/trpc/client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPicker } from "@/components/emoji-picker";
import { ExtendedMessage } from "@/types";
import { User } from "next-auth";
import { useDebounce } from "@/hooks/use-debounce";
import { chatTyping, sendMessage } from "@/actions/sockets";

let socket: any;

export const AddMessages = ({ user }: { user: User }) => {
  const [message, setMessage] = useState("");

  const [typing, setTyping] = useState(false);
  const debouncedMessage = useDebounce(message, 2000);

  const processMessageSend = trpc.addMessage.useMutation({
    onSuccess: async (newMessage) => {
      const socketPayload: ExtendedMessage = {
        message: {
          id: parseInt(newMessage.insertId),
          userId: user.id,
          text: message,
          createdAt: new Date(),
        },
        user: {
          id: user.id,
          name: user.name ?? "",
          image: user.image ?? "",
          email: user.email ?? "",
          emailVerified: null,
        },
      };

      toast.success("Message sent!");
      setMessage("");

      sendMessage(socketPayload);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  useEffect(() => {
    if (!message) return;

    setTyping(true);
  }, [message]);

  useEffect(() => {
    setTyping(false);
  }, [debouncedMessage]);

  useEffect(() => {
    chatTyping({
      name: user.name?.split(" ")[0] ?? "Someone",
      typing,
      userId: user.id,
    });
  }, [typing, user.name, user.id]);

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
              processMessageSend.mutate({ text: message, userId: user.id }); //change to sendMessage
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
          onClick={() =>
            processMessageSend.mutate({ text: message, userId: user.id })
          }
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
