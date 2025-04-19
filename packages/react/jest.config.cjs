const baseConfig = require("../../jest.config.cjs");

const config = {
  ...baseConfig,
  displayName: "react",
  coverageReporters: ["json-summary"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
};

module.exports = config;
