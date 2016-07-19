'use strict';

// var path = require('path');
var gulp = require('gulp');
// var conf = require('./conf');
var browserSync = require('browser-sync').create();


gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir :'./src'
        }
    });

    gulp.watch("src/js/*.js").on('change', browserSync.reload);
    gulp.watch("src/css/*.css").on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});