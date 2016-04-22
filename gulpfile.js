var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var casper = require('gulp-casperjs');

var app = require('./app.js');
var server = app.listen(1337);

gulp.task('test', function() {
  return gulp.src('app.spec.js').pipe(mocha());
});

gulp.task('casper', function() {
  return gulp.src('public/todotest.js').pipe(casper());
});

gulp.task('default', ['test', 'casper'] function() {
  server.close()
});
