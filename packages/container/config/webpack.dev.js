const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonWebpackConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const pjs = require('../package.json')

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html',
        },
    }, plugins: [new ModuleFederationPlugin({
        name: 'MFP container',
        remotes: {
            marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        },
        shared: pjs.dependencies,
    }), new HtmlWebpackPlugin({
        template:
            './public/index.html',
    })],
}

module.exports = merge(commonWebpackConfig, devConfig)