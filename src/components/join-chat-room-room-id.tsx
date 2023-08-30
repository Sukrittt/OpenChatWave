"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const JoinChatRoomByRoomId = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  return (
    <div className="flex gap-x-2">
      <Input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Type room id here."
      />
      <Button
        variant="secondary"
        onClick={() => router.push(`/video-chat/${roomId}`)}
        disabled={roomId.length === 0}
      >
        Join
      </Button>
    </div>
  );
};

export default JoinChatRoomByRoomId;
