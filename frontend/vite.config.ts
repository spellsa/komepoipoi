import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        preview: resolve(import.meta.dirname, "preview.html"),
      },
    },
  },
});
