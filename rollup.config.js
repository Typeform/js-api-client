import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolveModule from 'rollup-plugin-node-resolve'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'

const onwarn = (warning, rollupWarn) => {
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    rollupWarn(warning)
  }
}

const plugins = [
  commonjs({
    include: ['node_modules/**']
  }),
  json()
]

export default [{
  input: 'src/index.js',
  output: [{
    file: pkg.main,
    format: 'cjs',
    exports: 'named'
  }, {
    file: pkg.module,
    format: 'es',
    exports: 'named'
  }],
  onwarn,
  plugins: [
    resolveModule({
      mainFields: ['main', 'module'],
      preferBuiltins: true
    }),
    ...plugins
  ],
  external: ['http', 'https', 'url', 'zlib', 'assert', 'stream', 'tty', 'util', 'os']
}, {
  input: 'src/index.js',
  output: {
    file: pkg.browser,
    format: 'umd',
    name: 'typeformAPI',
    exports: 'named'
  },
  onwarn,
  plugins: [
    resolveModule({
      mainFields: ['browser']
    }),
    terser(),
    ...plugins
  ]
}]
