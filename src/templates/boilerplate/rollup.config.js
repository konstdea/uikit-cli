import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';

const pkg = require('./package.json');

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name.slice(pkg.name.indexOf('/') + 1),
      globals: {
        'react': 'React',
        'prop-types': 'PropTypes',
      },
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: pkg.name.slice(pkg.name.indexOf('/') + 1),
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: ['react', 'prop-types'],
  plugins: [
    resolve(),
    postcss({
      modules: true,
    }),
    babel({
      exclude: 'node_modules/**',
      // if external helpers true then use global babel object
      externalHelpers: true
    }),
    commonjs(),
    filesize()
  ]
};
