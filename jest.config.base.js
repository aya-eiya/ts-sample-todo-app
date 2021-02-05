module.exports = {
  verbose: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts', 'node', 'd.ts'],
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tests/tsconfig.json',
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testEnvironment: 'node',
  coverageDirectory: 'coverages/',
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1',
  },
}
