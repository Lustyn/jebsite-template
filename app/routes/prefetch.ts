import {
  unstable_createContext,
  unstable_RouterContextProvider,
} from "react-router";
import type { Route } from "../+types/root";
import type { QueryClient } from "@tanstack/react-query";
import { getQueryClient } from "~/lib/trpc";
import { appRouter, type AppRouter } from "../api/router";
import {
  createTRPCOptionsProxy,
  type TRPCOptionsProxy,
} from "@trpc/tanstack-react-query";
import { createContext } from "~/api/context";

export const queryClientContext = unstable_createContext<QueryClient>();

export const queryClientMiddleware: Route.unstable_MiddlewareFunction = (
  { context },
  next,
) => {
  const queryClient = getQueryClient();
  context.set(queryClientContext, queryClient);

  return next();
};

export const trpcContext =
  unstable_createContext<TRPCOptionsProxy<AppRouter>>();

export const trpcMiddleware: Route.unstable_MiddlewareFunction = (
  { request, context },
  next,
) => {
  const queryClient = context.get(queryClientContext);

  context.set(
    trpcContext,
    createTRPCOptionsProxy({
      ctx: createContext({ req: request }),
      router: appRouter,
      queryClient,
    }),
  );

  return next();
};

export const prefetch = (context: unstable_RouterContextProvider) => {
  const queryClient = context.get(queryClientContext);
  const trpc = context.get(trpcContext);

  return {
    queryClient,
    trpc,
  };
};
