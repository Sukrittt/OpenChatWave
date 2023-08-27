import { z } from "zod";
import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { message, users } from "@/db/schema";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getMessages: publicProcedure.query(async () => {
    const messages = await db
      .select()
      .from(message)
      .orderBy(desc(message.createdAt))
      .innerJoin(users, eq(users.id, message.userId));
    return messages;
  }),
  addMessage: publicProcedure
    .input(
      z.object({
        text: z.string().min(1, "Message must be at least 1 character long"),
        userId: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const newMessage = await db
        .insert(message)
        .values({ text: opts.input.text, userId: opts.input.userId })
        .execute();

      return newMessage;
    }),
});

export type AppRouter = typeof appRouter;
