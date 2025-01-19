import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    ignorePatterns: ['src/generated/**/*'],
    settings: {
      next: {
        rootDir: '.',
      },
    },
    rules: {
      // semi: ['error', 'never'],
      '@typescript-eslint/no-unused-vars': 'off',
      // 'react/no-unescaped-entities': 'off',
      // '@next/next/no-html-link-for-pages': 'error',
      // '@next/next/no-img-element': 'error',
    },
  }),
]

export default eslintConfig
