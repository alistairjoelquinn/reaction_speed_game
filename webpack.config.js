const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
    entry: ["@babel/polyfill", __dirname + '/src/start.js'],
    output: {
        path: __dirname,
        filename: 'output.js'
    },
    performance: {
        hints: false
    },
    mode: require.main == module ? 'production' : 'development',
    optimization: require.main == module ? {
        minimizer: [
            new UglifyJsPlugin({})
        ]
    } : {},
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new WebpackBar()
    ]
};

if (require.main == module) {
    webpack(config, function (err, info) {
        if (err) {
            console.log(err);
        }
        if (info && info.compilation.errors.length) {
            console.log(info.compilation.errors);
        }
    });
} else {
    module.exports = require('webpack-dev-middleware')(webpack(config), {
        watchOptions: {
            aggregateTimeout: 300
        },
        publicPath: '/'
    });
}
