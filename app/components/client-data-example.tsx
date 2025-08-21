"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/lib/trpc";

export function ClientDataExample() {
  const trpc = useTRPC();
  const statsQuery = useQuery(trpc.serverDemo.getStats.queryOptions());

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-blue-600">
        🔵 Client Component (Hydrates on Client)
      </h3>
      <p className="mb-3 text-sm text-gray-600">
        This component fetches data on the client side after hydration.
      </p>

      {statsQuery.isPending ? (
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-sm text-gray-500">Loading stats...</span>
        </div>
      ) : statsQuery.error ? (
        <div className="text-red-600">Error: {statsQuery.error.message}</div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {statsQuery.data?.users}
              </div>
              <div className="text-xs text-gray-500">Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {statsQuery.data?.posts}
              </div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {statsQuery.data?.comments}
              </div>
              <div className="text-xs text-gray-500">Comments</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Data fetched on client after hydration
          </div>
        </div>
      )}
    </div>
  );
}
