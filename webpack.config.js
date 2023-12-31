const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    }
    ,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    //index live 
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title:'Todo App',
            title:'Development'
        })
    ],

};