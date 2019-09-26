import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import {terser} from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel'

const pkg = require('./package.json');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.unpkg,
      format: 'umd',
      name: pkg.name.slice(pkg.name.indexOf('/') + 1),
      globals: {
        'react': 'React',
        'styled-components': 'StyledComponents'
      },
    },
    {
      file: pkg.esmodule,
      format: 'es',
    },
  ],
  external: ['react', 'styled-components'],
  plugins:
    [
      resolve({extensions}),
      babel({
        extensions,
        include: ['src/**/*'],
        exclude: 'node_modules/**',
        // if external helpers true then use global babel object
        externalHelpers: true
      }),
      commonjs(),
      terser(),
      filesize()
    ]
};
