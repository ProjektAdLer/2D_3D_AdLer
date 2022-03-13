// This file is used together with react-scripts-rewire to overwrite the webpack config of your CRA App to add capability for:
// Typescript Decorators
// TODO: have entry Point of App in src/React/Index.tsx

const { override, addBabelPlugin } = require("customize-cra");
const babelTsTransformPlugin = require("babel-plugin-transform-typescript-metadata");

module.exports = {
  webpack: override(addBabelPlugin(babelTsTransformPlugin)),
  jest: (config) => {
    config.preset = "ts-jest";
    config.testEnvironment = "jsdom";
    config.transformIgnorePatterns = [
      "<rootDir>/node_modules/(?!@babylonjs)(.*)",
    ];
    config.testPathIgnorePatterns = [
      "<rootDir>/node_modules/",
      "<rootDir>/src/Babylon/Template/",
    ];
    config.collectCoverage = true;
    config.coverageProvider = "v8";
    config.coveragePathIgnorePatterns = [
      "/node_modules/",
      "/Template/",
      "/Prototyping/",
      "/*.test.ts",
      "/SBWExample/",
      "/Types/",
      "/DependencyInjection/",
    ];
    config.coverageReporters = ["text-summary", "lcov"];
    config.setupFiles = ["./jest-setup-files.ts"];
    config.verbose = true;

    return config;
  },
};
