"use strict";

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
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
gulp.task('desktop-common-js', function() {
    return gulp.src([
            'app/desktop/js/common.js'
        ])
        .pipe(concat('common.min.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('../public/js'));
});

gulp.task('desktop-sass', function() {
    return gulp.src('app/desktop/sass/**/*.sass')
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(gulp.dest('../public/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('mobile-common-js', function() {
    return gulp.src([
        'app/mobile/js/common.js'
    ])
        .pipe(concat('common.mobile.min.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('./../frontend/web/js'));
});

gulp.task('mobile-sass', function() {
    return gulp.src('app/mobile/sass/**/*.sass')
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.mobile.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(gulp.dest('./../frontend/web/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: ''
        },
        notify: false,
        // tunnel: true,
        // tunnel: "bulavka", //Demonstration page: http://projectmane.localtunnel.me
    });
});

gulp.task('watch-desktop', ['desktop-sass', 'desktop-common-js', 'browser-sync'], function() {
    gulp.watch('app/desktop/sass/**/*.sass', ['desktop-sass']);
    gulp.watch('app/desktop/js/common.js', ['desktop-common-js']);
});

gulp.task('watch-mobile', ['mobile-sass', 'mobile-common-js', 'browser-sync'], function() {
    gulp.watch('app/mobile/sass/**/*.sass', ['mobile-sass']);
    gulp.watch('app/mobile/js/common.js', ['mobile-common-js']);
});
