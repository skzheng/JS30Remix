// // webpack.config.js
// var webpack = require('webpack')
// const path = require('path');

// module.exports = {
//     entry: {
//         entry: __dirname + '/index.js'
//     },
//     output: {
//         path: path.join(__dirname, 'public'),
//         filename: 'bundle.js'
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 loader: 'babel-loader',
//                 exclude: /node_modules/,
//                 query: {
//                     presets: ['es2015']
//                 }
//             }
//         ]
//     },
//     plugins: [
//         new webpack.optimize.UglifyJsPlugin()
//     ]
// }