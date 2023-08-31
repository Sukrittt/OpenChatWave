"use client";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

const VideoInfoDropdown = ({ roomId }: { roomId: string }) => {
  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);

      toast.success("Room id copied. Share it with your friends.");
    } catch (error) {
      toast.success("Something went wrong.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Icons.info className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={copyRoomId}>
          Copy room id
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VideoInfoDropdown;
