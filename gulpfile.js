var gulp = require('gulp');
var sass = require('gulp-sass');
var sync = require('browser-sync').create();
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

//delete old files
gulp.task('clean-css', function() {
    return del('dist/css');
});

gulp.task('clean-scripts', function () {
    return del('dist/js/*.js');
});

//compile sass to css
gulp.task('sass', function() {
    return gulp.src([
        // 'src/css/vendor/*css',
        'sass/main.scss'
    ])
        // .pipe(concat('main.css'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(sync.reload({
            stream: true
        }));
});

//minify css
gulp.task('minify-css', ['clean-css', 'sass'], function() {
    return gulp.src([
        'src/css/vendor/*.css',
        'dist/css/*.css'
    ])
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('bundle.min.css'))
        .pipe(clean({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', ['clean-scripts'], function() {
    return gulp.src([
        'src/js/vendor/jquery-1.11.2.min.js',
        'src/js/vendor/jquery-ui.min.js',
        'src/js/vendor/bootstrap.min.js',
        'src/js/main.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(sync.reload({
            stream: true
        }));
});

//watch task
gulp.task('watch', ['browserSync'], function() {
    gulp.watch('sass/**/*.scss', ['minify-css']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('*.html').on('change', sync.reload);
});

//browser sync
gulp.task('browserSync', function() {
    sync.init({
        server: {
            baseDir: ''
        }
    });
});

// gulp.task('default', ['sass', 'scripts', 'watch']);

gulp.task('default', ['minify-css', 'scripts', 'watch']);