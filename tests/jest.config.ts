import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    collectCoverageFrom: [
        '../../tests/**/*.ts'
    ]
};

export default config;