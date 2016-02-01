'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');


gulp.task('default', ['browser-sync','sass','nodemon','js'], function () {

});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		proxy: "http://localhost:1337",
        port: 8080,
	});

	gulp.watch("./scss/*.scss", ['sass']);
  gulp.watch("./views/*.jade").on('change', browserSync.reload);
	// add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("js/*.js", ['js-watch']);
});

var browser_sync_delay = 500;
gulp.task('nodemon', function (cb) {
	var started = false;

	return nodemon({
		script: 'bin/www',
    ext: 'js jade json scss',
    watch: ['bin/www', 'app.js', 'routes/**/*', 'views/**/*', 'scss/**/*','public/**/*']
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	})
  .on('restart', function onRestart() {
    // Reload connected browsers after set delay.
    reloadBrowser(browser_sync_delay);
  });
});

function reloadBrowser(delay) {
  if(delay) {
    setTimeout(function reload() {
      browserSync.reload()
    }, delay);
  } else {
    browserSync.reload();
  }
}

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
        .pipe(gulp.dest('./public/javascripts/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);
