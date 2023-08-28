import { NextApiRequest } from "next";

import { NextApiResponseServerIo, SocketTypingType } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const content: SocketTypingType = req.body;

    res?.socket?.server?.io?.emit("global-chat-typing", content);
    return res.status(200).json(content);
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
}
