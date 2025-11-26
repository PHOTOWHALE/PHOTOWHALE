// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { defineConfig, globalIgnores } from "eslint/config";
import storybook from "eslint-plugin-storybook";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

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

  // --- Prettier 연동 ---
  // eslint-config-prettier -> ESLint formatting rule들을 끔
  // eslint-plugin-prettier -> ESLint 오류로 Prettier 포맷 경고를 띄움
  {
    ...prettierConfig,
    plugins: { prettier },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // --- Next 기본 ignore 수정(프로젝트 상황에 맞게 유지) ---
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
