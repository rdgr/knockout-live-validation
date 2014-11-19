var jshint = require('gulp-jshint');
var gulp = require('gulp');

gulp.task('jshint', function() {
  return gulp.src([
      'js/*.js',
      'js/objects/*.js',
      'js/models/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jshint']);
