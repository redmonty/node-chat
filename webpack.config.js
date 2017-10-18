module.exports = {
    entry: {
        App: "./public/js/index.js",//над которым работает w,
        // vendor: "./app/assets/scripts/vendor.js",
    },
    output: {
        path: __dirname + "/public/js",//куда выгружает скомпилированый
        filename: "app.js"//имя скомпилированого файла
    },
    module: {//настройка бебель компиляции es6 в es5
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['es2015']
                    }
                }
            }
        ]
    }
};