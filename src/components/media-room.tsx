"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Icons } from "@/components/icons";
import { User } from "@/db/schema";

interface MediaRoomProps {
  roomId: string;
  user: Pick<User, "name" | "id">;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ roomId, video, audio, user }: MediaRoomProps) => {
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
      <div className="flex flex-col pt-10 justify-center items-center">
        <Icons.spinner className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="dark"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
