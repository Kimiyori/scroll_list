import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@/app": fileURLToPath(new URL("./src/app", import.meta.url)),
      "@/entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
      "@/features": fileURLToPath(new URL("./src/features", import.meta.url)),
      "@/pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@/shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
      "@/test-utils": fileURLToPath(
        new URL("./src/test-utils", import.meta.url)
      ),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-utils/setup.ts"],
    globals: true,
  },
});
