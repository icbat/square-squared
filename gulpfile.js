var gulp = require('gulp');

gulp.task('default', ['copy-bower'], function() {});

var bower_components = [
  'bower_components/phaser/build/phaser.min.js'
];

gulp.task('copy-bower', function() {
  return gulp
    .src(bower_components)
    .pipe(gulp.dest('./js/vendor/'));
});
