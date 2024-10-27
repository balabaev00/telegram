module.exports = {
  testRegex: '.*\\.(test|spec)\\.ts$',
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  transform: {
    '.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "app/test/",
  ],
  testTimeout: 30000,
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/test/test-environment.ts"],
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
    'src/(.*)': '<rootDir>/src/$1',
    'test/(.*)': '<rootDir>/test/$1',
    '@common/(.*)': '<rootDir>/src/common/$1',
    '@core/(.*)': '<rootDir>/src/modules/core/$1',
    '@features/(.*)': '<rootDir>/src/modules/features/$1',
    '@system/(.*)': '<rootDir>/src/modules/system/$1',
  },
};

