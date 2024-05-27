#!/usr/bin/env node

'use strict'

const file = process.argv[2]

if (!file) {
  console.error('Please provide a file to read.')
  process.exit(1)
}

const { rollup } = require('rollup')
const { default: typescriptPlugin } = require('@rollup/plugin-typescript')
const { default: injectPlugin } = require('@rollup/plugin-inject')
const { default: virtualPlugin } = require('@rollup/plugin-virtual')
const ts = require('typescript')
const fs = require('node:fs/promises')

/**
 * @param {ts.Node} node
 */
function visit(node) {
  if (node.kind === ts.SyntaxKind.NewKeyword) {
    throw new Error(
      'No new. In order to create an object with a custom prototype, use Object.create(), which is available.'
    )
  }
  if (node.kind === ts.SyntaxKind.TypeOfKeyword) {
    throw new Error('No typeof. Use type(payload) instead.')
  }
  if (
    node.kind === ts.SyntaxKind.ThrowKeyword ||
    node.kind === ts.SyntaxKind.TryKeyword ||
    node.kind === ts.SyntaxKind.CatchKeyword ||
    node.kind === ts.SyntaxKind.FinallyKeyword
  ) {
    throw new Error("No exceptions. Don't use throw or try/catch/finally.")
  }
  if (
    node.kind === ts.SyntaxKind.ConstKeyword ||
    node.kind === ts.SyntaxKind.VarKeyword
  ) {
    throw new Error('No var/const, only let.')
  }
  if (
    node.kind === ts.SyntaxKind.EqualsEqualsToken ||
    node.kind === ts.SyntaxKind.ExclamationEqualsToken
  ) {
    throw new Error('No ==/!=. Use ===/!== instead.')
  }
  ts.forEachChild(node, visit)
}

async function build() {
  try {
    const bundle = await rollup({
      input: file,
      plugins: [
        typescriptPlugin({ tsconfig: './tsconfig.json' }),
        virtualPlugin({
          polyfills: await fs.readFile('./polyfills.js', { encoding: 'utf8' }),
        }),
        injectPlugin({
          str: ['polyfills', 'str'],
          hexStr: ['polyfills', 'hexStr'],
          type: ['polyfills', 'type'],
          sourceMap: false,
        }),
      ],
      cache: false,
    })

    const output = 'bundle.js'

    await bundle.write({
      format: 'iife',
      strict: false,
      file: output,
    })

    const code = await fs.readFile(output, { encoding: 'utf8' })

    console.log(code)

    const sourceFile = ts.createSourceFile(
      'temp.ts',
      code,
      ts.ScriptTarget.Latest
    )

    await fs.rm(output, { force: true, recursive: false })

    visit(sourceFile)
  } catch (error) {
    console.error('Error during bundle creation:', error)
    process.exit(1)
  }
}

build()
