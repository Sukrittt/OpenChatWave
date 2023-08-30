import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import JoinChatRoomByRoomId from "@/components/join-chat-room-room-id";

const VideoChat = async () => {
  const session = await getAuthSession();

  return (
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
      <div className="flex gap-x-4 items-center">
        <Link
          href={`/video-chat/${session?.user.id}`}
          className={buttonVariants()}
        >
          Create a room
        </Link>
        <span className="text-muted-foreground text-xs">or</span>
        <JoinChatRoomByRoomId />
      </div>
    </div>
  );
};

export default VideoChat;
