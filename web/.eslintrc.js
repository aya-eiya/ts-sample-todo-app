const config = require('../.eslintrc.base');

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['src/**/*.ts', '*.ts'],
      parser: '@typescript-eslint/parser',
      env: {
        browser: false,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended', // Accessibility rules
        'plugin:react-hooks/recommended', // React hooks rules
        'plugin:react/recommended',
        'prettier',
        'prettier/@typescript-eslint',
      ],
      rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
      },
    },
  ],
};
