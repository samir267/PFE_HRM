module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  checkCoverage: true,
  all: true,
  include: [
    'src/**/!(*.test.*).[tj]s?(x)'
  ],
  exclude: [
      '**/tests/**/*.ts', 'node_modules/**'
  ],
  reporter: [
    'html',
    'lcov',
    'text',
  ],
  reportDir: 'output/nyc-coverage',
  "check-coverage": true,
  "lines": 0,
  "branches": 0,
  "functions": 0,
  "statements": 0,
  tempDir: 'output/temp'
};