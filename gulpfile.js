const gulp = require('gulp'),
    webpack = require('webpack'),
    watch = require('gulp-watch');

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
gulp.task('watch',() => {
    watch('./public/js/index.js',()=>{//watch changes in js files
        gulp.start('scripts');//start webpack and reload browser with changes
    });
});