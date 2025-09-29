export default {
  testEnvironment: "jsdom",
  verbose: true,
  reporters: ["default", ["jest-progress-bar-reporter", { showSummary: true }]],
};
