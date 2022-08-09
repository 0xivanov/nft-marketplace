const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const webpack = require("webpack");

module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
     }),
    ],
    target: 'node'
}