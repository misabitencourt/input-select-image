import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
    entry: 'src/index.js',
    output: {
        file: 'dist/select-image.js',
        format: 'iife',
        name: 'selectImage'        
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        uglify()
    ],
}