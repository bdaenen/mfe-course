const { merge } = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const pjs = require('../package.json')

const prdConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/marketing/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap.js',
            },
            shared: pjs.dependencies,
        })
    ],
}

module.exports = merge(commonWebpackConfig, prdConfig)
