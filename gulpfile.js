const gulp = require('gulp'),
    webpack = require('webpack'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),//$variableName
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins'),
    rgba = require('postcss-hexrgba');

//запускает webpack компиляцию(настроено в webpack.config.js)
gulp.task('scripts', (callback)=> {
webpack(require('./webpack.config.js'), (err,stats)=>{
    if(err) {
        console.log(err.toString());
    }
    console.log('webpack completed!Scripts changed! Be happy!');
    console.log(stats.toString());
    callback(); 
});
});

gulp.task('styles',function(){//
console.info('CSS changed, have a nice day, you are the best!');
return gulp.src('./public/css/styles.css')//take file and upgraid it with 
    .pipe(postcss([cssImport, mixins, cssvars, nested, rgba, autoprefixer]))//postcss-simle-vars, postcss-nestet, autoprefixer
    .on('error',function (err){
        console.error(err.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./public'));//and create updaited css file in our directory
});
gulp.task('watch',() => {
    watch('./public/js/index.js',()=>{//watch changes in js files
        gulp.start('scripts');//start webpack and reload browser with changes
    });
    watch('./public/css/**/*.css',()=>{//watch changes in every css file in styles directory
        gulp.start('styles');//with every change make task 'styles  '
    });
});