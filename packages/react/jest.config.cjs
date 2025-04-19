const baseConfig = require("../../jest.config.cjs");

const config = {
  ...baseConfig,
  displayName: "react",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
};

module.exports = config;
