import type { Route } from "./+types/server-example";
import { prefetch } from "~/lib/prefetch";
import { ClientDataExample } from "~/components/client-data-example";
import { appRouter } from "~/api/router";
import { createContext } from "~/api/context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Server Components Example - Jebsite" },
    {
      name: "description",
      content:
        "Demonstrating React Server Components vs Client Components in React Router v7",
    },
  ];
}

export const unstable_middleware: Route.unstable_MiddlewareFunction[] = [
  async () => {
    const { queryClient, trpc } = prefetch();

    // Prefetch some data for client components
    void queryClient.prefetchQuery(trpc.serverDemo.getStats.queryOptions());
  },
];

export async function ServerComponent({}: Route.ComponentProps) {
  // Create server context for tRPC calls (use a mock request since we don't have access to it here)
  const mockRequest = new Request("http://localhost/server-example");
  const ctx = createContext({ req: mockRequest, resHeaders: new Headers() });
  const caller = appRouter.createCaller(ctx);

  // Fetch data directly on the server using tRPC
  const serverData = await caller.serverDemo.getSlowData();
  const serverInfo = await caller.serverDemo.getServerInfo();

  return (
    <main className="container mx-auto min-h-screen bg-gray-50 p-4 pt-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            React Server Components Example
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Comparing Server Components vs Client Components
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Server Component Example */}
          <div className="rounded-lg border bg-green-50 p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-green-600">
              🟢 Server Component (Rendered on Server)
            </h3>
            <p className="mb-3 text-sm text-gray-600">
              This component renders on the server with data already available.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Application Stats</h4>
                <div className="mt-2 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {serverData.stats.users}
                    </div>
                    <div className="text-xs text-gray-500">Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {serverData.stats.posts}
                    </div>
                    <div className="text-xs text-gray-500">Posts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {serverData.stats.comments}
                    </div>
                    <div className="text-xs text-gray-500">Comments</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900">Recent Activity</h4>
                <div className="mt-2 space-y-1">
                  {serverData.recentActivity.map(
                    (activity: {
                      id: number;
                      action: string;
                      timestamp: string;
                    }) => (
                      <div key={activity.id} className="text-sm">
                        <span className="text-gray-900">{activity.action}</span>
                        <span className="ml-2 text-gray-500">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900">Server Info</h4>
                <div className="mt-2 space-y-1 text-sm">
                  <div>
                    <span className="text-gray-600">Node Version:</span>
                    <span className="ml-2 font-mono text-gray-900">
                      {serverInfo.nodeVersion}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Environment:</span>
                    <span className="ml-2 font-mono text-gray-900">
                      {serverInfo.environment}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Rendered at:</span>
                    <span className="ml-2 font-mono text-gray-900">
                      {new Date(serverInfo.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-400">
                Data fetched and rendered on server (no client-side loading)
              </div>
            </div>
          </div>

          {/* Client Component Example */}
          <ClientDataExample />
        </div>

        <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-blue-800">
            Key Differences
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-green-700">Server Components</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>• Render on the server</li>
                <li>• Data is fetched before HTML is sent</li>
                <li>• No client-side JavaScript bundle</li>
                <li>• Faster initial page load</li>
                <li>• Can access server-only resources</li>
                <li>• No interactivity (no event handlers)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700">Client Components</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>• Hydrate and run on the client</li>
                <li>• Data is fetched after hydration</li>
                <li>• Adds to JavaScript bundle</li>
                <li>• Shows loading states</li>
                <li>• Runs in browser environment</li>
                <li>• Full interactivity support</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center space-x-2 rounded-lg bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800"
          >
            <span>← Back to Home</span>
          </a>
        </div>
      </div>
    </main>
  );
}
