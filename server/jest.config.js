module.exports = {
  verbose: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts', 'node', 'd.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'node',
  coverageDirectory: '.coverages',
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1',
  },
};
