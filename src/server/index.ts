import { z } from "zod";

import { db } from "@/db";
import { message } from "@/db/schema";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getMessages: publicProcedure.query(async () => {
    const messages = await db.select().from(message);
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
      await db
        .insert(message)
        .values({ text: opts.input.text, userId: opts.input.userId });
    }),
});

export type AppRouter = typeof appRouter;
