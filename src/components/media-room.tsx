"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

import { User } from "@/db/schema";
import "@livekit/components-styles";
import { Icons } from "@/components/icons";
import VideoInfoDropdown from "@/components/video-info-dropdown";

interface MediaRoomProps {
  roomId: string;
  user: Pick<User, "name" | "id">;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ roomId, video, audio, user }: MediaRoomProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    +(async () => {
      try {
        const formattedName = `${user.name}-${user.id}`;

        const resp = await fetch(
          `/api/livekit?room=${roomId}&username=${formattedName}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [roomId, user.name, user.id]);

  if (token === "") {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <Icons.spinner className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 relative">
      <div className="absolute top-12 right-16 z-50">
        <VideoInfoDropdown roomId={roomId} />
      </div>
      <LiveKitRoom
        data-lk-theme="dark"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
        onDisconnected={() => router.push("/video-chat")}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
};
