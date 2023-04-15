module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!((@babylonjs)|(history)(.*)))",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/*.test.ts",
    "/DependencyInjection/",
    "/Entities/",
    "/[A-z]*Debug[A-z]*.ts",
    "/[A-z]*Test[A-z]*/",
    "index.ts",
  ],
  coverageReporters: ["text-summary", "lcov"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 92,
    },
  },
  setupFilesAfterEnv: ["./jest-setup-files.ts"],
  verbose: true,

  //   moduleNameMapper: addJestMappings(),
};
