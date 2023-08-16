const { merge } = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const pjs = require('../package.json')

const devPort = 8080
const devHost = 'http://localhost'
const devConfig = {
    mode: 'development',
    output: {
        'publicPath': `${devHost}:${devPort}/`
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html',
        },
    }, plugins: [new ModuleFederationPlugin({
        name: 'MFP container',
        remotes: {
            auth: 'auth@http://localhost:8082/remoteEntry.js',
            marketing: 'marketing@http://localhost:8081/remoteEntry.js',
            dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
        },
        shared: pjs.dependencies,
    })],
}

module.exports = merge(commonWebpackConfig, devConfig)