import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  subResourceIntegrity: true,
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
    unstable_optimizeDeps: true,
  },
  // Uncomment these if you want to prerender your routes
  // serverBuildFile: "assets/server-build.js",
  // prerender: ["/"],
} satisfies Config;
