var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var casper = require('gulp-casperjs');

gulp.task('default', function() {
  nodemon({ script: 'app.js' })
  .on('start', ['test', 'test-casper']);
});

gulp.task('test', function() {
  return gulp.src('app.spec.js').pipe(mocha());
});

gulp.task('test-casper', function() {
  return gulp.src('public/todotest.js').pipe(casper());
});
