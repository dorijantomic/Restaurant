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

// TASKS go here

gulp.task('image-resize', ()=> 
 gulp.src('images/**/*.jpg')
    .pipe(imageResize({
        width:320,
        height:240,
        crop:true,
        upscale:true
    }))
    .pipe(gulp.dest("image_phone"))
);

gulp.task("web-comp", () =>
    gulp.src('image_phone/**/*.jpg')
        .pipe(webp())
        .pipe(gulp.dest('phone_images_webp'))
);


gulp.task('image-compress', () =>
    gulp.src("image_ready/*")
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
        .pipe(gulp.dest('image_compressed'))
);



// Tasks go here
gulp.task('generate-service-worker', () => {
    return workboxBuild.injectManifest({
        globDirectory: 'dist',
        globPatterns: [
            '**/*.{html,css,js,jpg}'
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
  

gulp.task('copyHtml', () => {
    gulp.src(['src/index.html', 'src/restaurant.html'])
        .pipe(gulp.dest('dist'))
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
    gulp.src('src/img/*.jpg')
    .pipe(gulp.dest('dist/img'))
})

gulp.task('default', (callback) => {
    runSequence('clean', ['copyHtml', 'minify-css','copyImage'], ['minify-main', 'minify-restaurant-info'], 'generate-service-worker', callback);
})