'use strict';

var gulp    = require( 'gulp' );
var sync    = require( 'browser-sync' );
var watch   = require( 'gulp-watch' );
var plumber = require( 'gulp-plumber' );

var DIR_SRC       = './src';
var DIR_SRC_SCSS  = './src/scss';
var DIR_SRC_JS    = './src/js';

var DIR_DIST      = './dist';
var DIR_DIST_CSS  = './dist/css';
var DIR_DIST_JS   = './dist/js';

var SCSS_FILES = './src/scss/**/*.scss';
var JS_FILES   = './src/js/**/*.js';

gulp.task('build-css', function() {
    var rubySass = require( 'gulp-ruby-sass' );
    var please = require( 'gulp-pleeease' );

    return rubySass( SCSS_FILES, {
        style     : 'compressed',
        compass   : false,
        sourcemap : false
    })
    .pipe( plumber() )
    .pipe( please({
        autoprefixer: {
            browsers: ['last 2 versions', 'Android 4.0']
        }
    }))
    .pipe( gulp.dest( DIR_DIST_CSS ) );
});

gulp.task( 'build-js', function(){
    var browserify = require( 'browserify' );
    var babelify   = require( 'babelify' );
    var source     = require( 'vinyl-source-stream' );
    var buffer     = require( 'vinyl-buffer' );
    var uglify     = require( 'gulp-uglify' );
    var rename     = require( 'gulp-rename' );

    return browserify({
        entries : [ DIR_SRC_JS + '/index.js' ],
        debug   : false
    })
    .transform( babelify )
    .bundle()
    .on( 'error', function( err ) {
        console.error( 'Error : ' + err.message);
        this.emit('end');
    })
    .pipe( source( 'bacon-clock.js' ) )
    .pipe( gulp.dest( DIR_DIST_JS ) )
    .pipe( buffer() )
    .pipe( uglify() )
    .pipe( rename ({
        extname : '.min.js'
    }))
    .pipe( gulp.dest( DIR_DIST_JS ) );
});

gulp.task( 'lint', function() {
    var eslint = require('gulp-eslint');
    return gulp.src( JS_FILES )
        .pipe( eslint( { useEslintrc: true } ) )
        .pipe( eslint.format() )
        .pipe( eslint.failAfterError() );
});

gulp.task('sync', function() {
    return sync.init( null, {
        server : {
            baseDir : './'
        },
        open: false
    });
});

gulp.task( 'reload', function() {
    return sync.reload();
});

gulp.task('watch', function() {
    watch( SCSS_FILES, function() {
        gulp.start( 'build-css' );
    });
    watch( [ JS_FILES ], function() {
        gulp.start( 'build-js' );
    });
    watch( [ DIR_DIST + '/**' ], function() {
        gulp.start( 'reload' );
    });
});

gulp.task('default', [ 'sync', 'watch' ]);