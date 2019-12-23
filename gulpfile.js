"use strict";

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify-es').default,
    cleanCSS     = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    ftp          = require('vinyl-ftp'),
    notify       = require("gulp-notify");

/*****************************************
 * FOR DESKTOP VERSION
 *****************************************/
gulp.task('js', function() {
    return gulp.src([
            'app/desktop/js/common.js'
        ])
        .pipe(concat('common.min.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('./app/public/js'))
        // .pipe(gulp.dest('./public/js'));
});

gulp.task('sass', function() {
    return gulp.src('app/desktop/sass/**/*.sass')
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(gulp.dest('./app/public/css'))
        // .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './app'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "bulavka", //Demonstration page: http://projectmane.localtunnel.me
    });
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
    gulp.watch('app/desktop/sass/**/*.sass', ['sass']);
    gulp.watch('app/desktop/js/common.js', ['js']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});
