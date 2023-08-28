import { Message, User } from "@/db/schema";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type ExtendedMessage = {
  message: Message;
  user: User;
};

export type SocketMessageType = {
  message: {
    id: number;
    userId: string;
    text: string;
    createdAt: string;
  };
  user: User;
};

export type SocketTypingType = {
  name: string;
  userId: string;
  typing: boolean;
};
