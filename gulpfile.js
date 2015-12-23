'use strict';

var gulp = require('gulp');
var serve = require('gulp-serve');
var ghPages = require('gulp-gh-pages');
var merge = require('merge-stream');
var $ = require('gulp-load-plugins')();
var del = require('del');

gulp.task('serve', serve('dist'));

gulp.task('deploy', function () {
  return gulp.src('dist/**/*').pipe(ghPages());
});

gulp.task('clean', del.sync.bind(null, ['.tmp', '.publish', 'dist']));

gulp.task('copy', function (cb) {
  var app = gulp.src([
    'app/**/*'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));

  var bower = gulp.src([
    'bower_components/**/*'
  ]).pipe(gulp.dest('dist/bower_components'));

  merge(app, bower)
    .pipe($.size({title: 'copy'}));

  cb();
});