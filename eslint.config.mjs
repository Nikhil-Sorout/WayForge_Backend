// eslint.config.js
import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginNode from "eslint-plugin-node";

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
      globals: {
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      node: eslintPluginNode,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,

      // You can customize rules here
      '@typescript-eslint/no-unused-vars': 'error',
      'no-undef': 'error',
      'node/no-process-env': 'off', // Optional: enforce process.env usage
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Disable rules that conflict with Prettier
  prettierConfig,
];