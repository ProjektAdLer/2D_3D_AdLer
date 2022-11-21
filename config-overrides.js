// This file is used together with react-scripts-rewire to overwrite the webpack config of your CRA App to add capability for:
// Typescript Decorators

const { override, addBabelPlugin } = require("customize-cra");
const babelTsTransformPlugin = require("babel-plugin-transform-typescript-metadata");
var path = require("path");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

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

    config.resolve.plugins = [new TsconfigPathsPlugin()];

    return config;
  }),
  jest: (config) => {
    config.preset = "ts-jest";
    config.testEnvironment = "jsdom";
    config.transformIgnorePatterns = [
      "<rootDir>/node_modules/(?!((@babylonjs)|(history)(.*)))",
    ];
    config.testPathIgnorePatterns = ["<rootDir>/node_modules/"];
    config.collectCoverage = true;
    config.coveragePathIgnorePatterns = [
      "/node_modules/",
      "/*.test.ts",
      "/DependencyInjection/",
      "/Entities/",
      "/[A-z]*Debug[A-z]*.ts",
      "/[A-z]*Test[A-z]*/",
      "index.ts",
    ];
    config.coverageReporters = ["text-summary", "lcov"];
    config.coverageThreshold = {
      global: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 92,
      },
    };
    config.setupFiles = ["./jest-setup-files.ts"];
    config.verbose = true;

    config.moduleNameMapper = addJestMappings();

    return config;
  },
};
function addJestMappings() {
  const tsConfig = require(path.resolve(__dirname, "tsconfig.json"));
  const obj = {};
  for (const key in tsConfig.compilerOptions.paths) {
    obj["^" + key.replace("/*", "(.*)$")] =
      "<rootDir>/" +
      tsConfig.compilerOptions.paths[key][0].replace("/*", "/$1");
  }
  obj["^src/(.*)$"] = "<rootDir>/src/$1";
  return obj;
}
