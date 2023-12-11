// rollup.config.js

import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/snowfall.js',
        output: [
            {
                file: 'dist/cjs.js',
                format: 'cjs',
                plugins: [terser()]
            },
            {
                file: 'dist/esm.js',
                format: 'es',
                plugins: [terser()]
            }
        ]
    }
];
