const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const imageResize = require("gulp-image-resize");
const webp = require("gulp-webp");
const workboxBuild = require('workbox-build');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const responsive = require('gulp-responsive')

// TASKS go here

gulp.task('img-resize',  () => {
    return gulp.src('src/img/*.webp')
      .pipe(responsive({
        // Resize all JPEG/WebP images to sizes: 300, 433, 552, 653, 752, 800.
        '*.webp': [{
          width: 300,
          rename: { suffix: '_w_300' },
        }, {
          width: 433,
          rename: { suffix: '_w_433' },
        }, {
          width: 653,
          rename: { suffix: '_w_653' },
        }, {
          width: 800,
          rename: { suffix: '_w_800' },
        }],
      }, {
   
        quality: 70,
        progressive: true,
        compressionLevel: 6,
        withMetadata: false,
      }))
      .pipe(gulp.dest('dist/img'));
  });

gulp.task("img-webp", () =>
    gulp.src(['src/img/1.jpg', 'src/img/2.jpg', 'src/img/3.jpg', 'src/img/4.jpg', 'src/img/5.jpg', 'src/img/6.jpg', 'src/img/7.jpg', 'src/img/8.jpg', 'src/img/9.jpg', 'src/img/10.jpg'])
        .pipe(webp())
        .pipe(gulp.dest('src/img'))
);


// Tasks go here
gulp.task('generate-service-worker', () => {
    return workboxBuild.injectManifest({
        globDirectory: 'dist',
        globPatterns: [
            '**/*.{html,css,js,webp}'
        ],
        swDest: 'dist/sw.js',
        swSrc: 'src/src-sw.js',
    }).then(({warnings}) => {
        // In case there are any warnings from workbox-build, log them.
        for (const warning of warnings) {
          console.warn(warning);
        }
        console.info('Service worker generation completed.');
      }).catch((error) => {
        console.warn('Service worker generation failed:', error);
      });
});

gulp.task('clean', () => {
    return del('dist');
})

gulp.task('minify-css',() => {
    return gulp.src('src/css/styles.css')
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/css'));
  });

gulp.task('copy-pwa-css', () => {
    return gulp.src('src/css/progressive-image.min.css')
    .pipe(gulp.dest('dist/css'));
})
  

gulp.task('copyHtml', () => {
    gulp.src(['src/index.html', 'src/restaurant.html'])
        .pipe(gulp.dest('dist'))
});

gulp.task('copy-pwa-js', () => {
    return gulp.src('src/js/progressive-image.min.js')
    .pipe(gulp.dest('dist/js'))
});

gulp.task('copy-preview-img', () => {
    gulp.src('src/img/preview/*.webp')
    .pipe(gulp.dest('dist/img/preview/'));
});

gulp.task('copy-touch-png', () => {
    gulp.src('src/img/touch/*.png')
    .pipe(gulp.dest('dist/img/touch/'));
});

gulp.task('minify-main', () => {
    gulp.src([
         'src/js/dbhelper.js','src/js/main.js'   
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets:['env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
});



gulp.task('minify-restaurant-info', () => {
    gulp.src([
         'src/js/dbhelper.js', 'src/js/restaurant_info.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets:['env']
        }))
        .pipe(concat('restaurant_info.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-idb', () => {
    gulp.src([
         'src/js/idb.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets:['env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('copy-manifest', () => {
    gulp.src('src/manifest.json')
    .pipe(gulp.dest('dist'));
})
/*
gulp.task('copy-dbhelper', () => {
    gulp.src('src/js/dbhelper.js')
    .pipe(gulp.dest('dist/js'))
}) 

gulp.task('copy-main', () => {
    gulp.src('src/js/main.js')
    .pipe(gulp.dest('dist/js'))
}) 

gulp.task('copy-restaurant_info', () => {
    gulp.src('src/js/restaurant_info.js')
    .pipe(gulp.dest('dist/js'))
}) 
*/





gulp.task('watch', () => {
    gulp.watch('src/css/*.css', ['minify-css']);
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('sequence', (callback) => {
    runSquence('clean', ['copyHtml', 'minify-css'], ['minify-main', 'minify-restaurant-info', 'copy-dbhelper'], callback)
})

gulp.task('copyImage', () => {
    gulp.src('src/img/*.webp')
    .pipe(gulp.dest('dist/img'))
})

gulp.task('default', (callback) => {
    runSequence('clean','img-webp', 'img-resize', ['copyHtml', 'minify-css','copyImage', 'copy-pwa-css', 'copy-pwa-js', 'copy-preview-img', 'copy-touch-png', 'copy-manifest'], ['minify-main', 'minify-restaurant-info', 'minify-idb'], 'generate-service-worker', callback);
})