"use client";
import { useEffect, useState } from "react";
import { format, isSameDay, subDays } from "date-fns";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import UserAvatar from "@/components/user-avatar";
import { useSocket } from "@/components/providers/socket-provider";
import { ExtendedMessage, SocketMessageType, SocketTypingType } from "@/types";

export const DisplayMessages = ({
  initialData,
  session,
}: {
  initialData: ExtendedMessage[];
  session: Session | null;
}) => {
  const { socket } = useSocket();
  const [data, setData] = useState(initialData);
  const [usersTyping, setUsersTyping] = useState<SocketTypingType[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("global-chat-channel", (socketData: SocketMessageType) => {
      const content = {
        ...socketData,
        message: {
          ...socketData.message,
          createdAt: new Date(socketData.message.createdAt),
        },
      };

      setData((prevData) => [content, ...prevData]);
    });

    socket.on("global-chat-typing", (socketData: SocketTypingType) => {
      handleManageTypingUsers(socketData);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleManageTypingUsers = (socketData: SocketTypingType) => {
    if (socketData.typing) {
      if (session && socketData.userId === session.user.id) return;

      setUsersTyping((prevUsers) => [...prevUsers, socketData]);
    } else {
      setUsersTyping((prevUsers) =>
        prevUsers.filter((eachUser) => eachUser.userId !== socketData.userId)
      );
    }
  };

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-center text-sm text-muted-foreground">
          No messages.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse overflow-y-auto no-scrollbar flex-1 gap-y-4 px-4 py-9 relative">
      {data.map((eachData) => (
        <MessageCard
          key={eachData.message.id}
          extendedMessage={eachData}
          sessionId={session?.user.id}
        />
      ))}
      {usersTyping.length > 0 && (
        <div
          className={cn(
            "text-xs text-muted-foreground tracking-tight absolute left-4 bottom-0",
            {
              "bottom-2": !session,
            }
          )}
        >
          <div className="flex gap-x-1">
            <div className="flex gap-x-1">
              {usersTyping.map((user, index) => {
                const lastUser = usersTyping.length - 1 === index;

                return (
                  <span className="font-bold" key={user.userId}>
                    {user.name}
                    {!lastUser && ","}
                  </span>
                );
              })}
            </div>
            is typing...
          </div>
        </div>
      )}
    </div>
  );
};

const MessageCard = ({
  extendedMessage,
  sessionId,
}: {
  extendedMessage: ExtendedMessage;
  sessionId: string | undefined;
}) => {
  const isCurrentUserMessage = extendedMessage.user.id === sessionId;

  const formattedTimeForMessage = (providedDate: Date) => {
    const currentDate = new Date();

    const hourDifference = Math.abs(
      currentDate.getHours() - providedDate.getHours()
    );

    if (hourDifference < 1) return format(providedDate, "h:mm a");

    if (isSameDay(providedDate, currentDate)) {
      return format(providedDate, "'Today at' h:mm a");
    }

    const yesterday = subDays(currentDate, 1);
    if (isSameDay(providedDate, yesterday)) {
      return format(providedDate, "'Yesterday at' HH:mm");
    }

    return format(providedDate, "dd MMM '·' h:mm a");
  };

  return (
    <div
      className={cn("flex w-full mt-5", {
        "justify-end": isCurrentUserMessage,
        "justify-start": !isCurrentUserMessage,
      })}
    >
      <div
        className={cn("flex gap-x-3 tracking-tight max-w-xs md:max-w-md", {
          "flex-row-reverse": isCurrentUserMessage,
        })}
      >
        <UserAvatar
          user={extendedMessage.user}
          className="rounded-md h-8 w-8 ring-2 ring-offset-2 ring-primary ring-offset-background"
        />

        <div className="flex flex-col gap-y-1">
          <div
            className={cn("text-muted-foreground text-xs flex gap-x-2", {
              "flex-row-reverse": isCurrentUserMessage,
            })}
          >
            <span className="font-bold">
              {extendedMessage.user.name?.split(" ")[0]}
            </span>
            {extendedMessage.message.createdAt && (
              <span className="text-[9px] font-semibold">
                {formattedTimeForMessage(extendedMessage.message.createdAt)}
              </span>
            )}
          </div>
          <div
            className={cn("flex", {
              "justify-end": isCurrentUserMessage,
            })}
          >
            <div
              className={cn(
                "border py-2 px-3 text-sm rounded-xl w-fit break-words flex",
                {
                  "rounded-tr-sm": isCurrentUserMessage,
                  "rounded-tl-sm": !isCurrentUserMessage,
                }
              )}
            >
              <span>{extendedMessage.message.text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
