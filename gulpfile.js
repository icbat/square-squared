var gulp = require('gulp');
var zip = require('gulp-zip');

var build_directory = 'build';

gulp.task('default', ['copy-bower', 'copy-graphics', 'copy-sounds', 'copy-fonts'], function() {});

var bower_components = [
    'bower_components/phaser/build/phaser.min.js',
    'bower_components/jquery/dist/jquery.min.js'
];

gulp.task('copy-bower', function() {
    return gulp
        .src(bower_components)
        .pipe(gulp.dest('./www/js/vendor/'));
});

gulp.task('copy-sounds', function() {
    return gulp
        .src('assets/sounds/*')
        .pipe(gulp.dest('./www/assets/sounds'));
});

gulp.task('copy-graphics', function() {
    return gulp
        .src(['assets/browser/favicon.png', 'assets/graphics/*'])
        .pipe(gulp.dest('./www/assets/graphics'));
});
gulp.task('copy-fonts', function() {
    return gulp
        .src('assets/fonts/*')
        .pipe(gulp.dest('./www/assets/fonts'));
});
