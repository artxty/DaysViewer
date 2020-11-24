module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:jest/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  ignorePatterns: ['node_modules/', 'babel.config.js'],
  rules: {
    // Allow jsx in .js files because of
    // https://github.com/expo/expo/issues/7262
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }]
  },
};
