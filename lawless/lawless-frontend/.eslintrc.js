module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
      jest: true,
    },
    extends: [
      'airbnb-typescript-prettier',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
      ENV_PRODUCTION: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      project: './tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'import'],
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: 0,
      'comma-dangle': [2, 'always-multiline'],
      'lines-between-class-members': 0,
      'object-curly-newline': 0,
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*.test.*', '**/*.spec.*'] },
      ],
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true,
        },
      ],
      'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.jsx'] }],
      'react/jsx-indent': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-props-no-multi-spaces': 0, // Disabled because of bug https://github.com/yannickcr/eslint-plugin-react/issues/2181
      'react/prop-types': 0,
      'react/jsx-props-no-spreading': 0,
      '@typescript-eslint/indent': 0,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0, // TODO Review if it's needed
      '@typescript-eslint/no-empty-interface': 1,
      '@typescript-eslint/no-empty-function': 1,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
      'import/core-modules': ['components', 'contexts', 'client', 'hooks', 'pages'],
    },
  };
  