module.exports = {
  testMatch: [
    '(/test/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/api/(.*)$': '<rootDir>/src/app/api/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
  },
};
