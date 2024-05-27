'use strict'

const path = require('node:path')

const { jsExtensions } = require('eslint-config-polioan/common/constants')

/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: [
    'polioan/configurations/comments',
    'polioan/configurations/general',
    'polioan/configurations/generalTypes',
    'polioan/configurations/regex',
    'polioan/configurations/spellcheck',
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  settings: {},
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: path.join(__dirname, 'tsconfig.bin.json'),
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [],
  rules: {},
  overrides: [
    {
      files: ['*.js'],
      extends: ['polioan/configurations/commonJS'],
    },
    {
      files: jsExtensions,
      extends: ['polioan/configurations/javascriptOnly'],
    },
  ],
  ignorePatterns: [
    'node_modules/*',
    '.eslintrc.*.js',
    'types.d.ts',
    'polyfills.js',
    'examples/*',
  ],
}

module.exports = config
