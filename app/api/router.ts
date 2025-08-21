import { hero } from "~/api/hero";
import { serverDemo } from "~/api/server-demo";
import { router } from "~/api/trpc";

export const appRouter = router({
  hero,
  serverDemo,
});

export type AppRouter = typeof appRouter;
