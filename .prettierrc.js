'use strict'

/**
 * @type {import('prettier').Config & Record<string, any>}
 */
const config = {
  plugins: [require.resolve('prettier-plugin-jsdoc')],
  useTabs: false,
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  printWidth: 80,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  tsdoc: true,
  jsdocCommentLineStrategy: 'multiline',
}

module.exports = config
