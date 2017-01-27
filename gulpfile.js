/**
 * Module Dependencies
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

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

 gulp.task('serve', ['sass', 'pug'], function() {

     browserSync.init({
         server: "./public"
     });

     gulp.watch("./src/scss/*.scss", ['sass', browserSync.reload]);
     gulp.watch('./src/views/**/*.pug', ['pug'])
     .on('change', browserSync.reload);
 });

 // Compile sass into CSS & auto-inject into browsers
 gulp.task('sass', function() {
     return gulp.src("./scss/*.scss")
         .pipe(sass())
         .pipe(gulp.dest("./public/css"))
         .pipe(browserSync.stream());
 });

 gulp.task('pug', function buildHTML() {
  return gulp.src('./src/views/*.pug')
  .pipe( pug( {pretty: true}))
  .pipe( gulp.dest('./public'));
});

 gulp.task('default', ['serve']);
