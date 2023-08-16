const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonWebpackConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const pjs = require('../package.json')

const devPort = 8083
const devHost = 'http://localhost'

const devConfig = {
    mode: 'development',
    output: {
        'publicPath': `${devHost}:${devPort}/`
    },
    devServer: {
        port: devPort,
        historyApiFallback: {
            index: '/index.html',
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }, plugins: [
        new ModuleFederationPlugin({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardApp': './src/bootstrap.js',
            },
            shared: pjs.dependencies,
        }),
        new HtmlWebpackPlugin({
            template:
                './public/index.html',
        })],
}

module.exports = merge(commonWebpackConfig, devConfig)