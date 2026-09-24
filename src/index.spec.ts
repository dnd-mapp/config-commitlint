import lint from '@commitlint/lint';
import load from '@commitlint/load';
import { describe, expect, it } from 'vitest';
import config from './index.ts';

async function lintMessage(message: string) {
    const { rules, parserPreset } = await load(config, { cwd: import.meta.dirname });
    const options: NonNullable<Parameters<typeof lint>[2]> = {};

    if (parserPreset?.parserOpts) {
        options.parserOpts = parserPreset.parserOpts;
    }
    return lint(message, rules, options);
}

describe('commitlint config', () => {
    it('accepts a conventional commit message', async () => {
        const { valid } = await lintMessage('feat(config): add the base config');
        expect(valid).toBe(true);
    });

    it('rejects a message without a type', async () => {
        const { valid } = await lintMessage('add the base config');
        expect(valid).toBe(false);
    });

    it('rejects an unknown type', async () => {
        const { valid } = await lintMessage('wip: add the base config');
        expect(valid).toBe(false);
    });

    it('accepts a header of 72 characters', async () => {
        const { valid } = await lintMessage(`fix: ${'a'.repeat(67)}`);
        expect(valid).toBe(true);
    });

    it('rejects a header longer than 72 characters', async () => {
        const { valid } = await lintMessage(`fix: ${'a'.repeat(68)}`);
        expect(valid).toBe(false);
    });

    it('rejects a body line longer than 72 characters', async () => {
        const { valid } = await lintMessage(`fix: handle the edge case

${'a'.repeat(73)}`);
        expect(valid).toBe(false);
    });

    it('accepts a body line of 72 characters', async () => {
        const { valid } = await lintMessage(`fix: handle the edge case

${'a'.repeat(72)}`);
        expect(valid).toBe(true);
    });
});
