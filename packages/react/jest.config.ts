import type { Config } from "jest";
import baseConfig from "../../jest.config.js";

const config: Config = {
  ...baseConfig,
  rootDir: __dirname,
  displayName: "core",
};

export default config;
