var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var outPath = __dirname + "/wwwroot";
module.exports = {
    target: "web",
    entry: {
        'main': "./TS/Main.ts"
    },
    output: {
        path: outPath,
        filename: "/js/[name].min.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".ts", ".less"]
    },
    module: {
        loaders: [
          { test: /\.ts/, exclude: [/node_modules/, /typings/], loader: "ts-loader" },
          { test: /\.less$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
          { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000&name=/css/[hash].[ext]' }
        ]
    },
    plugins: [
      new CleanWebpackPlugin([outPath  + '/js', outPath + '/css', outPath+'/lib']),
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new ExtractTextPlugin("/css/[name].min.css", { allChunks : true}),
      new CopyWebpackPlugin([
       { from: 'node_modules/jquery/dist', to: './lib/jquery/dist' },
       { from: 'node_modules/bootstrap/dist', to: './lib/bootstrap/dist' },
       { from: 'node_modules/devextreme/dist/js', to: './lib/devextreme/js' },
       { from: 'node_modules/devextreme/dist/css', to: './lib/devextreme/css' }
      ])
    ]
}