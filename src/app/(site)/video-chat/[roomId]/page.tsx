import { MediaRoom } from "@/components/media-room";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

interface VideoRoomProps {
  params: {
    roomId: string;
  };
}

const VideoRoom = async ({ params }: VideoRoomProps) => {
  const session = await getAuthSession();
  const { roomId } = params;

  if (!session) redirect("/sign-in");

  return (
    <div className="h-screen">
      <MediaRoom
        audio={true}
        video={true}
        roomId={roomId}
        username={session.user.name ?? "Anonymous"}
      />
    </div>
  );
};

export default VideoRoom;
