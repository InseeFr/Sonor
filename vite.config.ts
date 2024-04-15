import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

type ViteConfig = UserConfig & { test: InlineConfig };

const config: ViteConfig = {
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTest.js",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules/", "./setupTest.js"],
    },
  },
};

export default defineConfig(config);
