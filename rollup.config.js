import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs'
import copier from 'rollup-plugin-copier'
import json from 'rollup-plugin-json'
import globals from 'rollup-plugin-node-globals'
import resolveModule from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const copy = copier({
  items: [
    {
      src: 'src/typeform-types.ts',
      dest: 'dist/typeform-types.ts',
      createPath: true,
    },
  ],
})

const onwarn = (warning, rollupWarn) => {
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    rollupWarn(warning)
  }
}

const plugins = [typescript(), json(), copy]

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
      },
    ],
    onwarn,
    plugins: [
      resolveModule(),
      commonjs({
        include: ['node_modules/**'],
      }),
      ...plugins,
    ],
    external: [
      'http',
      'https',
      'url',
      'zlib',
      'assert',
      'stream',
      'tty',
      'util',
      'os',
      'express',
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'typeformAPI',
      exports: 'named',
      intro: 'const global = window;',
    },
    onwarn,
    plugins: [
      resolveModule({
        browser: true,
      }),
      commonjs({
        include: ['node_modules/**'],
        browser: true,
        preferBuiltins: false,
        ignoreGlobal: false,
      }),
      ...plugins,
      globals(),
      builtins(),
      terser(),
    ],
    external: ['crypto', 'express'],
  },
  {
    input: 'src/bin.ts',
    output: [
      {
        file: pkg.bin['typeform-api'],
        format: 'cjs',
        exports: 'named',
        banner: '#!/usr/bin/env node',
      },
    ],
    onwarn(warning, warn) {
      // supress warning on usa of eval()
      // eval() in ./src/bin.ts executes code supplied by user on their own machine, which is safe
      if (warning.code === 'EVAL') {
        return
      }
      warn(warning)
    },
    plugins: [
      resolveModule(),
      commonjs({
        include: ['node_modules/**'],
      }),
      builtins({ crypto: false }),
      ...plugins,
    ],
    external: [
      'http',
      'https',
      'url',
      'zlib',
      'assert',
      'stream',
      'tty',
      'util',
      'os',
      'crypto',
      'express',
    ],
  },
]

export default config
