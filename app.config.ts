// app.config.ts
import { defineConfig } from "@tanstack/start/config";

export default defineConfig({
  server: {
    preset: "node-server",
    prerender: {
      crawlLinks: true,
      routes: ["/blog"],
    },
  },
});
