"use client";

import Picker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "@/components/icons";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Icons.emoji className="text-zinc-500 hover:text-zinc-600 transition" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker
          theme={Theme.DARK}
          onEmojiClick={(data: any) => {
            onChange(data.emoji);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
