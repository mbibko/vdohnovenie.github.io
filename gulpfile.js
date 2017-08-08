var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var nunjucksRender = require('gulp-nunjucks-render');
var spritesmith = require('gulp.spritesmith');
var path = require('path');
var ftp = require( 'vinyl-ftp' );
var svgSprite = require("gulp-svg-sprites");

var spriteFolder = 'sprite-images';

gulp.task('html-watcher', ['html'], function() {
    browserSync.reload();
});

function getDataForFile(file) {
  return require('./app/html/data.json');
}

gulp.task('html', function() {
    return gulp.src('app/html/*.html')
        .pipe($.plumber({
            errorHandler: $.notify.onError("<%= error.message %>")
        }))
        .pipe($.data(getDataForFile))
        .pipe(nunjucksRender({
            path: ['app/html/layouts'] // String or Array 
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', function() {
    gulp.watch([
        'app/css/**/*.css',
        '!app/css/main.css',
        'app/js/**/*.js',
        'app/!images/' + spriteFolder + '/**/*.*',
        'app/images/**/*.{png,jpg,jpeg,gif,svg}',
        'app/fonts/**/*.*'
    ], {
        interval: 800
    }).on('change', reload);

    gulp.watch('app/scss/**/*.scss', {
        interval: 300
    }, ['sass']);

    gulp.watch(['app/images/' + spriteFolder + '/*.png', 'app/images/' + spriteFolder + '/**/*.png'], {
        interval: 300
    }, ['sprites']);

    gulp.watch(['app/html/*.html', 'app/html/**/*.html'], ['html-watcher']);
});

gulp.task('sass', function() {
    return gulp.src('app/scss/main.scss')
        .pipe($.sourcemaps.init())
        .pipe($.plumber({
            errorHandler: $.notify.onError("<%= error.message %>")
        }))
        .pipe($.sass({
            outputStyle: 'compressed', // libsass doesn't support expanded yet
            includePaths: ['bower_components/bootstrap-sass/assets/stylesheets/'],
        }))
        .pipe($.postcss([
            require('autoprefixer-core')({
                browsers: ['> 1%', 'ie >= 9']
            })
        ]))
        // .pipe($.csso())
        .pipe($.sourcemaps.write('./maps', {
            includeContent: false,
            sourceRoot: 'app/scss'
        }))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.stream({match: '**/*.css'}))
});


gulp.task('sprites', function() {
    // Generate our spritesheet
    var spriteData = gulp.src('app/images/' + spriteFolder + '/**/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
            imgPath: '../images/sprite.png',
            cssVarMap: function(sprite) {
                sprite.name = 'sprite-' + sprite.name;
            },
            algorithm: "top-down",
            algorithmOpts: {sort: false},
            padding: 10
        }));

    spriteData.img
        // .pipe(imagemin())
        .pipe(gulp.dest('app/images'));

    spriteData.css
        // .pipe(csso())
        .pipe(gulp.dest('app/scss/utilities'));
});

gulp.task('svg-sprites', function () {
    return gulp.src('app/images/svg/*.svg')
        .pipe(svgSprite({
            mode: "symbols",
            preview: false,
            svg: {
                symbols : "sprite.svg"
            }
        }))
        .pipe(gulp.dest("app/images"));
});

gulp.task('fonts', function() {
    return gulp.src('bower_components/bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest('app/fonts'));
});

gulp.task('serve', ['sass', 'fonts'], function() {
    browserSync.init({
        notify: false,
        open: false,
        server: {
            baseDir: ['app']
        }
    });
    gulp.start(['watch']);
});

/** Configuration **/
var user = 'maks';
var password = '3H8i5H5c';  
var host = '188.225.80.86';  
var port = 21;  
var localFilesGlob = ['./app/**/*'];
var baseFolder = './app/';
var remoteFolder = '/www/html.xx28.ru/temp';

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {  
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 5,
        log: $.util.log
    });
}
/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('ftp-deploy', function() {

    var conn = getFtpConnection();

    return gulp.src(localFilesGlob, { base: baseFolder, buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
    ;
});

gulp.task('default', ['serve']);