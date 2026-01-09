// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { defineConfig, globalIgnores } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  // --- Next.js 기본 recommended + TS + Core Web Vitals ---
  ...nextVitals,
  ...nextTs,

  // --- Storybook 규칙 추가 ---
  {
    plugins: {
      storybook,
    },
    rules: {
      ...storybook.configs.recommended.rules,
    },
  },

  // --- Next 기본 ignore 수정(프로젝트 상황에 맞게 유지) ---
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
