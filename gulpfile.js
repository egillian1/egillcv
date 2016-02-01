'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');


gulp.task('default', ['browser-sync','sass','js'], function () {
  // gulp.watch("/scss/*.scss", ['sass']).on('change', browserSync.reload);
  gulp.watch("./views/*.jade").on('change', browserSync.reload);
  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch("js/*.js", ['js-watch']);

  gulp.watch("scss/*.scss", ['sass-watch']);
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["./*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./public/stylesheets"))
        .pipe(browserSync.stream());
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('sass-watch',['sass'], browserSync.reload);
