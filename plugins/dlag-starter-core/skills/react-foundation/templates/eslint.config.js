// Illustrative ESLint flat config. Every imported plugin must already exist
// with matching APIs. Merge with the project config; do not replace it wholesale.
//
// See `guides/01-project-structure.md` and `guides/10-react-19-idioms.md`.
// Adjust `features` zone list to your actual feature folders.

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import a11y from 'eslint-plugin-jsx-a11y';

// List every top-level feature folder here.
const FEATURES = ['auth', 'comments', 'discussions', 'teams', 'users'];

const featureZones = FEATURES.flatMap((f) => [
  {
    target: `./app/features/${f}`,
    from: './app/features',
    except: [`./${f}`],
    message: `No cross-feature imports. ${f} must not reach into other features ;  compose at the app level.`,
  },
]);

const unidirectionalZones = [
  { target: './app/features', from: './app/routes', message: 'Features cannot import from app.' },
  {
    target: ['./app/components', './app/hooks', './app/lib', './app/types', './app/utils'],
    from: ['./app/features', './app/routes'],
    message: 'Shared modules cannot import from features or app. Flow is shared -> features -> app.',
  },
];

export default tseslint.config(
  { ignores: ['dist', 'build', 'coverage', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { project: './tsconfig.json' },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': a11y,
      import: importPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // React 19 idioms
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Hooks
      ...reactHooks.configs.recommended.rules,

      // Compiler (required before enabling React Compiler)
      // Use only the installed compatible React Hooks/Compiler lint preset.
      // Do not infer compilation from a lint package being present.

      // Accessibility
      ...a11y.configs.recommended.rules,

      // TypeScript hygiene
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Architecture enforcement ;  see guides/01-project-structure.md
      'import/no-restricted-paths': [
        'error',
        { zones: [...featureZones, ...unidirectionalZones] },
      ],

      // Anti-patterns from guides/12-anti-patterns.md
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'moment', message: 'Use date-fns. See guides/13-ecosystem-catalog.md.' },
            { name: 'lodash', message: 'Import from lodash-es per-function for tree-shaking.' },
          ],
        },
      ],
      // Enforce named exports (except route files)
      'import/no-default-export': 'error',
    },
  },
  {
    // Framework route components/root require their conventional default exports.
    files: ['app/routes/**/*.tsx', 'app/root.tsx'],
    rules: { 'import/no-default-export': 'off' },
  },
);
