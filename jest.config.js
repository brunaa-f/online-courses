module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  moduleFileExtensions: ["ts", "html", "js"],
  coverageReporters: ["html", "text-summary"],
};
