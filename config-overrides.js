// This file is used together with react-scripts-rewire to overwrite the webpack config of your CRA App to add capability for:
// Typescript Decorators

const { override, addBabelPlugin } = require("customize-cra");
const babelTsTransformPlugin = require("babel-plugin-transform-typescript-metadata");

// Environment Variables can be set here
// IMPORTANT: environment variables, that contain a Secret are set in .env.development or .env.production
process.env.GENERATE_SOURCEMAP = "false"; // disable sourcemap generation (removes warnings while building)

module.exports = {
  webpack: override(addBabelPlugin(babelTsTransformPlugin), (config) => {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      path: require.resolve("path-browserify"),
      fs: false,
    });
    config.resolve.fallback = fallback;

    return config;
  }),
  jest: (config) => {
    config.preset = "ts-jest";
    config.testEnvironment = "jsdom";
    config.transformIgnorePatterns = [
      "<rootDir>/node_modules/(?!@babylonjs)(.*)",
    ];
    config.testPathIgnorePatterns = ["<rootDir>/node_modules/"];
    config.collectCoverage = true;
    config.coveragePathIgnorePatterns = [
      "/node_modules/",
      "/*.test.ts",
      "/DependencyInjection/",
      "/Entities/",
      "/[A-z]*Debug[A-z]*.ts",
    ];
    config.coverageReporters = ["text-summary", "lcov"];
    config.coverageThreshold = {
      global: {
        branches: 92,
        functions: 92,
        lines: 92,
        statements: 92,
      },
    };
    config.setupFiles = ["./jest-setup-files.ts"];
    config.verbose = true;

    return config;
  },
};
