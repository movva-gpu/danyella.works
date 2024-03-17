import uglifyEs from 'uglify-es';
import gulp from 'gulp';
import header from 'gulp-header';
import rename from 'gulp-rename';
import { deleteAsync } from 'del';

import composer from 'gulp-uglify/composer.js';
import babel from 'gulp-babel';

import postcss from 'gulp-postcss';
import postcssNested from 'postcss-nested';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const { series, parallel, src, dest, task } = gulp;

const uglify = composer(uglifyEs, console);

task('clean', () => {
    return deleteAsync('www/assets/**/*.min.*');
})

task('minifyCSS', () => {
    const plugins = [
        autoprefixer(),
        postcssNested(),
        cssnano()
    ]
    return src('www/assets/css/**.css')
        .pipe(postcss(plugins))
        .pipe(header('/* minified */\n'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('www/assets/css/'));
});

task('minifyJS', () => {
    return src('www/assets/js/**.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify({
            output: {
                beautify: false,
                preamble: "/* uglified */"
            }
        }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('www/assets/js/'));
});

task('default', series('clean', parallel('minifyCSS', 'minifyJS')));