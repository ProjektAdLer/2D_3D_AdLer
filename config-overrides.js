// This file is used together with react-scripts-rewire to overwrite the webpack config of your CRA App to add capability for:
// Typescript Decorators
// TODO: have entry Point of App in src/React/Index.tsx

const { override, addBabelPlugin } = require("customize-cra");
const babelTsTransformPlugin = require("babel-plugin-transform-typescript-metadata");

module.exports = {
  webpack: override(addBabelPlugin(babelTsTransformPlugin), (config) => {
    const fallback = config.resolve.fallback || {};

    Object.assign(fallback, {
      path: require.resolve("path-browserify"),
      fs: false,
    });
    config.resolve.fallback = fallback;

    // const rules = config.module.rules || [];

    // rules.push({
    //   test: /\.svg?$/,
    //   type: "asset/resource",
    // });

    // config.module.rules = rules;

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
    config.coverageProvider = "v8";
    config.coveragePathIgnorePatterns = [
      "/node_modules/",
      "/Prototyping/",
      "/*.test.ts",
      "/SBWExample/",
      "/Types/",
      "/DependencyInjection/",
      "/I[A-Z]{1}[A-z]*.ts",
    ];
    config.coverageReporters = ["text-summary", "lcov"];
    config.setupFiles = ["./jest-setup-files.ts"];
    config.verbose = true;

    return config;
  },
};
