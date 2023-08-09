const { merge } = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const pjs = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prdConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'MFP container',
            remotes: {
                marketing: `marketing@${domain}/marketing/remoteEntry.js`,
            },
            shared: pjs.dependencies,
        })
    ],
}

module.exports = merge(commonWebpackConfig, prdConfig)
