import type { QueryClient } from "@tanstack/react-query";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { appRouter } from "~/api/router";
import { AsyncLocalStorage } from "async_hooks";

interface RequestLocalContext {
  request: Request;
  responseHeaders: Headers;
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<typeof appRouter>;
}

const requestLocalStorage = new AsyncLocalStorage<RequestLocalContext>();

const requestLocalContext = () => {
  const store = requestLocalStorage.getStore();
  if (!store) {
    throw new Error("No request context found");
  }

  return store;
};

/**
 * Provides request context for prefetching
 * @param context Request context
 * @param fn Function to run with request context
 * @returns Result of fn
 */
export const provideRequestLocalContext = <T>(
  context: RequestLocalContext,
  fn: () => T,
) => {
  return requestLocalStorage.run(context, () => {
    return fn();
  });
};

/**
 * Returns the request
 * @returns Request
 */
export const request = () => {
  return requestLocalContext().request;
};

/**
 * Returns the response headers
 * @returns Response headers
 */
export const responseHeaders = () => {
  return requestLocalContext().responseHeaders;
};

/**
 * Provides query client and TRPC client for prefetching
 * @param context Router context
 * @returns Query client and TRPC client
 */
export const prefetch = () => {
  const { queryClient, trpc } = requestLocalContext();
  return {
    queryClient,
    trpc,
  };
};

/**
 * Skips prefetching if the request is from the same origin.
 *
 * This is useful for skipping prefetching on internal navigations.
 * @param fn Function to run if not skipped
 * @returns Result of fn or undefined
 */
export async function skipIfSameOrigin<T>(
  fn: () => Promise<T>,
): Promise<T | undefined> {
  const req = request();
  const refererHeader = req.headers.get("referer");
  const referer = refererHeader ? new URL(refererHeader) : null;
  const url = new URL(req.url);
  // For our purposes, protocol (i.e. origin) isn't relevant since the fetches could be internal or behind a proxy
  // Origin: http://localhost:3000
  // Host: localhost:3000
  // Hostname: localhost
  const isSameOrigin = referer?.host === url.host;
  if (isSameOrigin) {
    return;
  }

  return await fn();
}
