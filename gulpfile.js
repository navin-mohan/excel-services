 const gulp = require('gulp');    
 const del = require('del'); 
 const useref = require('gulp-useref'),
     uglify = require('gulp-uglify'),
     cssnano = require('gulp-cssnano'),
     gulpIf = require('gulp-if')
     runSeq = require('run-sequence'),
     browserSync = require('browser-sync'),
     sass = require('gulp-sass'),
     babel = require('gulp-babel'),
     nunjucksRender = require('gulp-nunjucks-render'),
     data = require('gulp-data');


 gulp.task('images',function(){
     return gulp.src('app/img/**/*.+(jpg|png|gif|svg)')
        .pipe(gulp.dest('dist/img'));
 });

 gulp.task('favicon',function(){
     return gulp.src('app/favicon.ico')
        .pipe(gulp.dest('dist'));
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
  gulp.watch('app/pages/**/*.+(html|nunjucks)', ['nunjucks']); 
  gulp.watch('app/templates/**/*.+(html|nunjucks)', ['nunjucks']); 
  gulp.watch('app/*.json', ['nunjucks']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  // adding data
  .pipe(data(function() {
      return require('./app/data.json')
    }))
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['app/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({
         stream: true
     }));
});

gulp.task('build',function(callback){
    runSeq('clean:dist',
        'sass',
        'nunjucks',
        ['useref','images','fonts','favicon'],
        callback
    );
});

gulp.task('default', function (callback) {
  runSeq(['sass','nunjucks','browserSync', 'watch'],
    callback
  );
});
