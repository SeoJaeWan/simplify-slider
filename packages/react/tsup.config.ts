import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  splitting: true,
  treeshake: true,
  minify: true,
  external: ["react", "react-dom"],
  loader: {
    ".css": "copy",
  },
});
