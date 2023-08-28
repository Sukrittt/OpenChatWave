import axios from "axios";
import { toast } from "sonner";

import { ExtendedMessage, SocketTypingType } from "@/types";

export const sendMessage = async (socketPayload: ExtendedMessage) => {
  try {
    await axios.post("/api/socket/message", socketPayload);
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const chatTyping = async (socketPayload: SocketTypingType) => {
  try {
    await axios.post("/api/socket/typing", socketPayload);
  } catch (error) {
    toast.error("Something went wrong");
  }
};
