module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'json-format',
    'simple-import-sort',
    '@emotion',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'import/extensions': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx', '.js', '.jsx'],
      },
    ],
    '@typescript-eslint/no-use-before-define': ['off'],
  },
  ignorePatterns: ['**/build/**/*', '.eslintrc.js', 'craco.config.js'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
