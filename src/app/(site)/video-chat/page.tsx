import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import JoinChatRoomByRoomId from "@/components/join-chat-room-room-id";
import { Shell } from "@/components/shell";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

const VideoChat = async () => {
  const session = await getAuthSession();

  return (
    <Shell>
      <Navbar />
      <div className="my-24 space-y-8 h-[50vh]">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Instant Video Hangouts
          </h1>
          <p className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
            Create and launch your custom video hangout room instantly. Connect,
            chat, and share moments in real time with ease.
          </p>
        </div>
        <div className="flex gap-4 sm:items-center flex-col sm:flex-row">
          <Link
            href={`/video-chat/${session?.user.id}`}
            className={cn(buttonVariants(), "w-fit")}
          >
            Create a room
          </Link>
          <span className="text-muted-foreground text-xs hidden sm:block">
            or
          </span>
          <JoinChatRoomByRoomId />
        </div>
      </div>
    </Shell>
  );
};

export default VideoChat;
