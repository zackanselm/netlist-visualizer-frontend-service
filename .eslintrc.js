module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['@typescript-eslint', 'jsx-a11y'],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'jsx-a11y/label-has-associated-control': [2, {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
    }],
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4],
    'react/sort-comp': [
        2,
        {
            order: ['static-variables', 'static-methods', 'instance-variables', 'constructor', 'lifecycle', 'everything-else', 'render'],
        },
    ],
    indent: [2, 4, { SwitchCase: 1 }],
    'max-len': [2, { code: 160 }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'consistent-return': 'off',
    'prefer-destructuring': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
        'error',
        'always',
        {
            js: 'never',
            jsx: 'always',
            ts: 'never',
            tsx: 'never',
            'd.ts': 'never',
        },
    ],
    'import/no-extraneous-dependencies': [
        'warn',
        {
            packageDir: [
                path.join(__dirname, './'),
                path.join(__dirname, '../'),
            ],
        },
    ],
    'no-use-before-define': 'off',
    'import/no-relative-packages': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/ban-types': 'off',
  },
  settings: {
      'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
          node: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
      },
      react: {
          version: 'detect',
      },
  },
};
