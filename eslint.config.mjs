import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import airbnbConfig from "eslint-config-airbnb";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  airbnbConfig,
  prettierConfig,
  {
    plugins: [prettierPlugin],
    rules: {
      'prettier/prettier': 'error',  // Prettier 규칙을 ESLint에 통합
      'indent': ['error', 2],  // 2칸 들여쓰기
      'quotes': ['error', 'single'],  // 단일 따옴표 사용
      'semi': ['error', 'always'],  // 세미콜론 항상 사용
      'no-unused-vars': ['warn'],  // 사용되지 않는 변수 경고
      'complexity': ['warn', { 'max': 10 }],  // 함수 복잡성 제한
      'max-depth': ['warn', 4],  // 코드 중첩 수준 제한
      'comma-dangle': ['error', 'always-multiline'],  // 마지막 쉼표 사용
      'no-console': 'warn',  // console.log 사용 경고
    },
  },
];