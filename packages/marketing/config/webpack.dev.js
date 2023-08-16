const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonWebpackConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const pjs = require('../package.json')

const devPort = 8081
const devHost = 'http://localhost'

const devConfig = {
    mode: 'development',
    output: {
        publicPath: `${devHost}:${devPort}/`,
    },
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap.js',
            },
            shared: pjs.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
}

module.exports = merge(commonWebpackConfig, devConfig)
