import { defineConfig } from "tsup";
import baseConfig from "../../tsup.config.js";

export default defineConfig({
  ...baseConfig,
  entry: {
    index: "src/index.ts",
    "errors/index": "src/errors/index.ts",
  },

  loader: {
    ".css": "copy",
  },
});
