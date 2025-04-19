const baseConfig = require("../../jest.config.cjs");

const config = {
  ...baseConfig,
  displayName: "core",
  coverageReporters: ["json-summary"],
};

module.exports = config;
