const   gulp            = require("gulp"),
        sass            = require("gulp-sass"),
        postcss         = require("gulp-postcss"),
        autoprefixer    = require("autoprefixer"),
        cssnano         = require("cssnano"),
        sourcemaps      = require("gulp-sourcemaps"),
        browserSync     = require("browser-sync").create();

// Define tasks after requiring dependencies
function style() {
    return (
        gulp
            .src('scss/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('css'))
            // Add browsersync stream pipe after compilation
            .pipe(browserSync.stream())
    );
}

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

function reload() {
    browserSync.reload();
}

// Add browsersync initialization at the start of the watch task
function watch() {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "./"
        }

        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        //  proxy: "http://localhost/FED/css-menu/"
    });
    gulp.watch("scss/**/*.scss", style, reload);

    gulp.watch("http://localhost/FED/css-menu/*.html", reload);
}

exports.watch = watch;