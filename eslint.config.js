import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import svelte from 'eslint-plugin-svelte';

export default [
  {
    ignores: ['build/**', '.svelte-kit/**', 'dist/**', 'node_modules/**']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }]
    }
  },
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    files: ['**/*.svelte', '**/*.svelte.{js,ts}'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.svelte']
      }
    },
    rules: {
      'svelte/valid-compile': 'off'
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,svelte}'],
    rules: {
      'no-undef': 'off'
    }
  }
];
