module.exports = {
  collectCoverage: true,
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],
  collectCoverageFrom: ["src/**/*.ts"],
  moduleFileExtensions: ["js", "json", "ts"],
  roots: ["./tests/unit"],
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  testEnvironment: "node"
};
