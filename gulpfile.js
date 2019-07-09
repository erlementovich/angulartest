'use strict';
const watch = require('gulp-watch');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const mincss = require('gulp-clean-css');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const del = require('del');
sass.compiler = require('node-sass');
//**** ****//


//browser


gulp.task('browser-sync', function () {
    browserSync.init({
        port: 1337,
        server: {
            baseDir: 'dist'
        }
    });
});
//**** ****//

//cleaner
gulp.task('clean', function (cb) {
    return del('dist', cb);
});
//**** ****//

//перетащим html файлы в dist
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});
//**** ****//

//скомпилируем scss
gulp.task('sass', function () {
    return gulp.src('app/scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(mincss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});
//**** ****//

// js
gulp.task('js', function () {
    return gulp.src('app/js/main.js')
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});
//**** ****//


//**** ****//

//Будем следить за файлами
gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/js/**/*.js', gulp.parallel('js'));
    gulp.watch('app/*.html', gulp.parallel('html'));
});
//**** ****//


//Построим проект
gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'js', 'html')));
//**** ****//



//Построим, запустим и будем смотреть
gulp.task('default', gulp.parallel('html', 'sass', 'js', 'browser-sync', 'watch'));
//**** ****//
