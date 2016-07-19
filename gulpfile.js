'use strict';

// var path = require('path');
var gulp = require('gulp');
// var conf = require('./conf');
var browserSync = require('browser-sync').create();
var inject = require('gulp-inject');
var copy = require('gulp-copy');
// var start = require('gulp-start');

gulp.task('copy-temp', function () {
    return gulp.src(['./src/**/*', '!./src/index.html'])
        .pipe(copy('./.tmp'));
});

gulp.task('inject', ['copy-temp'], function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./.tmp'))
        .pipe(browserSync.stream());
});


gulp.task('serve', ['inject'], function(){

    browserSync.init({
        server: {
            baseDir :'./.tmp'
        }
    });

    gulp.watch(["src/css/*.css", "src/js/*.js", "src/*.html"], ['inject']);
});