import commonjs from 'rollup-plugin-commonjs';
import rollupCopy from 'rollup-plugin-copy';
import resolveModule from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const plugins = [
  resolveModule(),
  typescript({
    typescript: require('typescript')
  }),
  commonjs(),
  rollupCopy({
    'src/interface.ts': 'lib/interface.ts'
  })
];

const external = Object.keys(
  Object.assign({}, pkg.peerDependencies, pkg.dependencies)
);

const completeBuilds = [{
  input: 'src/index.ts',
  output: [{
    file: pkg.main,
    format: 'cjs'
  }, {
    file: pkg.module,
    format: 'es'
  }],
  external,
  plugins
}];

export default completeBuilds;