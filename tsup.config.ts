import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "react/index": "src/react/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  outDir: "dist",
  splitting: true,
  treeshake: true,
  minify: true,

  loader: {
    ".css": "copy",
  },
});
