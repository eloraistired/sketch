const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, '../app/app.js'),
    resolve: {
        modules: [
            path.resolve(__dirname, '../app'),
            path.resolve(__dirname, '../static'),
            path.resolve(__dirname, '../node_modules')
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    output:
    {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../src/index.html'),
        //     minify: true
        // }),
        new MiniCSSExtractPlugin(),
        new webpack.DefinePlugin({
            IS_DEV: process.env.NODE_ENV
        }),
        new CleanWebpackPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // SCSS
            {
                test: /\.s[ac]ss$/i,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },

            // Images
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },
            // GLSL
            {
                test: /\.(glsl|frag|vert)$/,
                exclude: /node_modules/,
                use:
                ['raw-loader', 'glslify-loader',
                    {
                        options:
                        {
                            outputPath: 'assets/shaders/'
                        }
                    }
                ]
            }
        ]
    }
}
