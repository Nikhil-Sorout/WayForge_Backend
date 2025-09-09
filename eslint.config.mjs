// eslint.config.js
import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import nodePlugin from 'eslint-plugin-node';
import globals from 'globals';

export default [
  // Apply basic recommended JavaScript rules
  js.configs.recommended,
  
  // Prettier config must be applied separately
  prettier,
  
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
        project: './tsconfig.json' // Add this if using type-aware rules
      },
      globals: {
        ...globals.node, // This includes all Node.js globals
        ...nodePlugin.environments?.node?.globals, // Additional Node globals from plugin
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      node: nodePlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      
      // You can customize rules here
      '@typescript-eslint/no-unused-vars': 'error',
      'no-undef': 'off', // TypeScript already handles this
      'node/no-process-env': 'off', // Optional: enforce process.env usage
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];