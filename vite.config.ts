import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["html", "text-summary"],
      all: true,
      include: ["src/**.ts"],
    },

    globals: true,
  },
});
