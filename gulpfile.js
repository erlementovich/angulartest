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
    return gulp.src(['!app/template/components/*.html', 'app/template/*.html'])
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
    return gulp.src(['!app/js/components/*.js', 'app/js/main.js'])
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});
//**** ****//

//json
gulp.task('json', function () {
    return gulp.src('app/json/*.json')
        .pipe(plumber())
        .pipe(gulp.dest('dist/json'))
        .pipe(browserSync.stream());
});
//**** ****//

//images
gulp.task('image', function () {
    return gulp.src('app/img/*.*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});


//**** ****//

//Будем следить за файлами
gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/js/**/*.js', gulp.parallel('js'));
    gulp.watch('app/**/*.html', gulp.parallel('html'));
    gulp.watch('app/img/**/*.*', gulp.parallel('image'));
    gulp.watch('app/json/*.json', gulp.parallel('json'));
});
//**** ****//


//Построим проект
gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'js', 'html', 'image', 'json')));
//**** ****//



//Построим, запустим и будем смотреть
gulp.task('default', gulp.parallel('json','html', 'sass', 'js', 'image', 'browser-sync', 'watch'));
//**** ****//
