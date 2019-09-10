import commonjs from 'rollup-plugin-commonjs'
import copier from 'rollup-plugin-copier'
import json from 'rollup-plugin-json'
import resolveModule from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'

const copy = copier({
  items: [{
    src: 'src/typeform-types.ts',
    dest: 'dist/typeform-types.ts',
    createPath: true
  }]
})

const onwarn = (warning, rollupWarn) => {
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    rollupWarn(warning)
  }
}

const plugins = [
  commonjs({
    include: ['node_modules/**']
  }),
  typescript(),
  json(),
  copy
]

export default [{
  input: 'src/index.ts',
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
  external: ['http', 'https', 'url', 'zlib', 'assert', 'stream', 'tty', 'util', 'os', 'tslib']
}, {
  input: 'src/index.ts',
  output: {
    file: pkg.browser,
    format: 'umd',
    name: 'typeformAPI',
    exports: 'named',
    globals: {
      tslib: 'tslib'
    }
  },
  onwarn,
  plugins: [
    resolveModule({
      mainFields: ['browser']
    }),
    terser(),
    ...plugins
  ],
  external: ['tslib']
}]
