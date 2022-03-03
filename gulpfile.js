const {src, dest, watch, series, parallel} = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Imagenes

const imagemin = require('gulp-imagemin');

function css(done){
    //Copilar sass:
    //paso 1 - idenficar el archivo, paso 2 - copilarlo el .css, paso 3 guardar el .css

    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));

    done();

}

function imagenes(done){
    src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest ('build/img'));
    done();
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css , dev);


//Series - Se inicia una tarea y  hata que finaliza inicia la siguente
//Parallel - todas inician al mismo tiempo.