import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "react/index": "src/react/simplifySlider.tsx",
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
});
