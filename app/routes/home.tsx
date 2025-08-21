import { useTRPC } from "~/lib/trpc";
import type { Route } from "./+types/home";
import { useQuery } from "@tanstack/react-query";
import { prefetch } from "~/lib/prefetch";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg" },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jebsite" },
    { name: "description", content: "Welcome to my Jebsite!" },
  ];
}

export const unstable_middleware: Route.unstable_MiddlewareFunction[] = [
  async () => {
    const { queryClient, trpc } = prefetch();

    // Block the page to prefetch
    await queryClient.prefetchQuery(trpc.hero.message.queryOptions());

    // Or, if you don't want to block the page:
    // void queryClient.prefetchQuery(trpc.hero.message.queryOptions());

    // If you need to prevent internal navigations from causing prefetching, use skipIfSameOrigin
    // await skipIfSameOrigin(request, async () => {
    //   await queryClient.prefetchQuery(trpc.hero.message.queryOptions());
    // });
  },
];

export default function Home() {
  const trpc = useTRPC();
  const message = useQuery(trpc.hero.message.queryOptions());

  return (
    <main className="container mx-auto flex flex-col items-center space-y-8 p-4 pt-16">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl">Jebsite</h1>
        <p className="animate-shimmer bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 bg-[size:200%_100%] bg-clip-text text-sm text-transparent">
          {message.data}
        </p>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Examples</h2>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/server-example"
            className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            <span>🚀</span>
            <span>React Server Components Demo</span>
          </a>
        </div>
        <p className="mx-auto max-w-md text-sm text-gray-500">
          Explore the differences between Server Components and Client
          Components in this interactive example.
        </p>
      </div>
    </main>
  );
}
