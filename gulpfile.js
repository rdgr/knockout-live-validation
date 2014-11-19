var jshint = require('gulp-jshint');
var gulp = require('gulp');

gulp.task('hint', function() {
  return gulp.src([
      'js/objects/LiveValidation.js',
      'js/models/LiveValidationViewModel.js',
      'js/custom-rules.js',
      'js/main.js'
      ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['hint']);
