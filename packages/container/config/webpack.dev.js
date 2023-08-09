const { merge } = require('webpack-merge')
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
    })],
}

module.exports = merge(commonWebpackConfig, devConfig)