// eslint.config.js
import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Apply basic recommended JavaScript rules
  js.configs.recommended,

  // Configure TypeScript support for ALL your source files
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      'gateway/**/*.ts',
      'services/**/*.ts', 
      'shared/**/*.ts',
      'workers/**/*.ts'
    ],
    // IGNORE patterns - replace .eslintignore
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'src/generated/**', // Prisma client
      '**/*.d.ts',       // Type declaration files
      '**/generated/**'  // Any other generated files
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      
      // You can customize rules here
      '@typescript-eslint/no-unused-vars': 'error',
      'no-undef': 'error',
    },
  },

  // Disable rules that conflict with Prettier
  prettierConfig,
];