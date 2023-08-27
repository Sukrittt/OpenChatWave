"use client";
import { format, isSameDay, subDays } from "date-fns";

import { Message, User } from "@/db/schema";
import { Session } from "next-auth";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";

type ExtendedMessage = {
  message: Message;
  user: User;
};

export const DisplayMessages = ({
  data,
  session,
}: {
  data: ExtendedMessage[];
  session: Session | null;
}) => {
  if (data.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">No messages.</p>
    );
  }

  return (
    <div className="flex flex-col-reverse overflow-y-auto no-scrollbar flex-1 gap-y-4 px-4 py-3 border rounded-xl">
      {data.map((eachData, index) => {
        return (
          <MessageCard
            key={eachData.message.id}
            extendedMessage={eachData}
            sessionId={session?.user.id}
          />
        );
      })}
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

    return format(providedDate, "MM/dd/yyyy h:mm a");
  };

  return (
    <div
      className={cn("flex w-full mt-5", {
        "order-1 justify-end": isCurrentUserMessage,
        "order-2 justify-start": !isCurrentUserMessage,
      })}
    >
      <div
        className={cn("flex gap-x-3 tracking-tight max-w-md", {
          "flex-row-reverse": isCurrentUserMessage,
        })}
      >
        <UserAvatar
          user={extendedMessage.user}
          className="rounded-md h-8 w-8 ring-2 ring-offset-2 ring-primary"
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
