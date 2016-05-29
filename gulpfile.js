var gulp = require('gulp');
var zip = require('gulp-zip');

var build_directory = 'build';

gulp.task('default', ['copy-bower'], function() {});

var bower_components = [
  'bower_components/phaser/build/phaser.min.js'
];

gulp.task('copy-bower', function() {
  return gulp
    .src(bower_components)
    .pipe(gulp.dest('./js/vendor/'));
});

gulp.task('build', ['stage-root', 'stage-assets', 'stage-js'], function() {
  return gulp
  .src(build_directory + "/**")
  .pipe(zip('endless-running.zip'))
  .pipe(gulp.dest('dist'));
});

gulp.task('stage-root', function() {
  return gulp
  .src([
    'index.html',
    'LICENSE',
    'README.md'
  ])
  .pipe(gulp.dest(build_directory))
  ;
});

gulp.task('stage-assets', function() {
  return gulp
  .src('assets/**')
  .pipe(gulp.dest(build_directory + '/assets'))
  ;
});

gulp.task('stage-js', ['copy-bower'], function() {
  return gulp
  .src('js/**')
  .pipe(gulp.dest(build_directory + '/js'))
  ;
});
