import type { UserConfig } from '@commitlint/types';

/** The commitlint config for D&D Mapp projects, based on the Conventional Commits config. */
const config: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'header-max-length': [2, 'always', 72],
        'body-max-line-length': [2, 'always', 72],
    },
};

export default config;
