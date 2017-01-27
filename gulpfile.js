/**
 * Module Dependencies
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var gulp = require('gulp');
var sass = require('gulp-sass');

/**
 * Gulp Tasks
 */

 gulp.task('browser-sync', function() {
     browserSync.init({
         server: {
           proxy: "localhost:7000",  // local node app address
           port: 7000,  // use *different* port than above
           notify: true
         }
     });
 });

 gulp.task('serve', ['sass'], function() {

     browserSync.init({
         server: "./public"
     });

     gulp.watch("./scss/*.scss", ['sass', browserSync.reload]);
     gulp.watch("./public/*.html").on('change', browserSync.reload);
 });

 // Compile sass into CSS & auto-inject into browsers
 gulp.task('sass', function() {
     return gulp.src("./scss/*.scss")
         .pipe(sass())
         .pipe(gulp.dest("./public/css"))
         .pipe(browserSync.stream());
 });

 gulp.task('default', ['serve']);
