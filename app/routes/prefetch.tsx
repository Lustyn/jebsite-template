import { Providers } from "~/components/providers";
import type { Route } from "./+types/prefetch";
import { dehydrate } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { prefetch, provideRequestLocalContext } from "~/lib/prefetch";
import { getQueryClient } from "~/lib/query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { createContext } from "~/api/context";
import { appRouter } from "~/api/router";

export const unstable_middleware: Route.unstable_MiddlewareFunction[] = [
  async ({ request }, next) => {
    const responseHeaders = new Headers();
    const queryClient = getQueryClient();
    const context = createContext({
      req: request,
      resHeaders: responseHeaders,
    });
    const trpc = createTRPCOptionsProxy({
      ctx: context,
      router: appRouter,
      queryClient,
    });
    const trpcCaller = appRouter.createCaller(context);
    return provideRequestLocalContext(
      { request, responseHeaders, queryClient, trpc, trpcCaller },
      async () => {
        const response = await next();

        responseHeaders.forEach((value, key) => {
          response.headers.set(key, value);
        });

        return response;
      },
    );
  },
];

export async function ServerComponent({}: Route.ComponentProps) {
  const { queryClient } = prefetch();

  return (
    <Providers dehydratedState={dehydrate(queryClient)}>
      <Outlet />
    </Providers>
  );
}
