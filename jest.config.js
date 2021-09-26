// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['**/src/**/*.js'],
  watchPlugins: ['jest-watch-typeahead/testname'],
};
