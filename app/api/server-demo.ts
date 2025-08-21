import { publicProcedure, router } from "~/api/trpc";

// Simulate some server-side data that might come from a database
const serverData = {
  stats: {
    users: 1234,
    posts: 5678,
    comments: 9012,
  },
  recentActivity: [
    { id: 1, action: "User registered", timestamp: new Date().toISOString() },
    {
      id: 2,
      action: "Post created",
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
    {
      id: 3,
      action: "Comment added",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
  ],
  serverInfo: {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || "development",
  },
};

export const serverDemo = router({
  // Fast endpoint for client-side fetching demo
  getStats: publicProcedure.query(() => {
    return serverData.stats;
  }),

  // Endpoint that simulates slower data fetching
  getSlowData: publicProcedure.query(async () => {
    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...serverData,
      fetchedAt: new Date().toISOString(),
    };
  }),

  // Server info that can only be accessed on server
  getServerInfo: publicProcedure.query(() => {
    return serverData.serverInfo;
  }),
});
