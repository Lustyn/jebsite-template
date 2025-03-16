export function createContext({ req }: { req: Request }) {
  // As an example, you can retrieve auth or other information here.
  // const user = { name: req.headers.get("username") ?? "anonymous" };

  return {
    req,
    // user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
