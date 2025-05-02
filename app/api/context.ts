import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export function createContext(fetchCtx: FetchCreateContextFnOptions) {
  // As an example, you can retrieve auth or other information here.
  // const user = { name: fetchCtx.req.headers.get("username") ?? "anonymous" };

  return {
    ...fetchCtx,
    // user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
