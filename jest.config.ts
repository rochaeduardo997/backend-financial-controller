// eslint-disable-next-line no-restricted-exports
export const base = {
  collectCoverageFrom: [
    '<rootDir>/apps/auth/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/apps/ornament-detection/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/libs/**/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: ['<rootDir>/libs/typeorm/src/migrations'],
  coverageDirectory: './coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  roots: ['<rootDir>/'],
  moduleNameMapper: {
    '^@shared/(.*)$': `${process.cwd()}/src/@shared/$1`,
    '^@users/(.*)$': `${process.cwd()}/src/users/$1`,
    '^@categories/(.*)$': `${process.cwd()}/src/categories/$1`,
  },
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  // transform: { '^.+\\.(t|j)s$': 'ts-jest' },

  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
};

export default { ...base };
