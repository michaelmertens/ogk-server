var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var clean = require('gulp-clean');

var tsFiles = ['./**/*.ts', '!./node_modules/**/*.*'];

gulp.task('clean', function(){
   return gulp.src(['./index.js', './facades/**/*.js'])
       .pipe(clean())
});

gulp.task('scripts', ['clean'], function () {    
    var tsResult =  gulp.src(tsFiles, {base: "."})
        .pipe(sourcemaps.init())
        .pipe(ts({
            module: 'commonjs',
            target: 'es6',
            moduleResolution: 'node',
            experimentalDecorators: true
        }))
        //.on('error', function() { process.exit(1) })
        //.pipe(gulp.dest('.'));
        
    return tsResult.js
        .pipe(sourcemaps.write({
        // Return relative source map root directories per file.
            sourceRoot: function (file) {
                var sourceFile = path.join(file.cwd, file.sourceMap.file);
                return path.relative(path.dirname(sourceFile), file.cwd);
            }
        }))
        .pipe(gulp.dest('.'));
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['scripts'], function () {
});

gulp.task('watch', function () {
    gulp.watch(tsFiles, ['scripts']);
});