 const gulp = require('gulp');    
 const del = require('del'); 
 const useref = require('gulp-useref'),
     uglify = require('gulp-uglify'),
     cssnano = require('gulp-cssnano'),
     gulpIf = require('gulp-if')
     runSeq = require('run-sequence'),
     browserSync = require('browser-sync'),
     sass = require('gulp-sass'),
     babel = require('gulp-babel');

 gulp.task('images',function(){
     return gulp.src('app/img/**/*.+(jpg|png|gif|svg)')
        .pipe(gulp.dest('dist/img'));
 });


 gulp.task('browserSync', function() {
    browserSync.init({
        server: {
        baseDir: 'app'
        },
    });
   });

  gulp.task('fonts',function(){
     return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
 });

 gulp.task('clean:dist', function() {
    return del.sync('dist');
 })

 gulp.task('sass',function(){
     return gulp.src('app/scss/**/*.scss')
     .pipe(sass())
     .pipe(gulp.dest('app/css'))
     .pipe(browserSync.reload({
         stream: true
     }));
 });

 gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', babel({ presets: ['es2015' ]})))
    .pipe(gulpIf('*.js', uglify()))    
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('build',function(callback){
    runSeq('clean:dist',
        'sass',
        ['useref','images','fonts'],
        callback
    );
});

gulp.task('default', function (callback) {
  runSeq(['sass','browserSync', 'watch'],
    callback
  );
});
