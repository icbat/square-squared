var gulp = require('gulp');
var zip = require('gulp-zip');

var build_directory = 'build';

gulp.task('default', ['copy-bower', 'copy-graphics', 'copy-sound'], function() {});

var bower_components = [
    'bower_components/phaser/build/phaser.min.js',
    'bower_components/phaser-state-transition-plugin/dist/phaser-state-transition-plugin.min.js'
];

gulp.task('copy-bower', function() {
    return gulp
        .src(bower_components)
        .pipe(gulp.dest('./www/js/vendor/'));
});

gulp.task('copy-sound', function() {
    return gulp
        .src('assets/sound/*')
        .pipe(gulp.dest('./www/assets/sounds'));
});

gulp.task('copy-graphics', function() {
    return gulp
        .src('assets/browser/favicon.png')
        .pipe(gulp.dest('./www/assets/graphics'));
});
