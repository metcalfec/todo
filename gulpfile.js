var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('default', function() {
  nodemon({ script: 'app.js' })
  .on('start', ['test']);
});

gulp.task('test', function() {
  return gulp.src('app.spec.js').pipe(mocha());
});

gulp.task('development', function() {
  nodemon({ script: 'app.js' })
  .on('start', ['test']);
});
