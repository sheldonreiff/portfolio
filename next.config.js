const withCSS = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');

module.exports = withCSS({
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(ttf|eot|svg|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'file-loader'
            }]
        })

        config.plugins.push(new Dotenv());

        return config;
    },
    exportPathMap: function() {
        return {
            '/': { page: '/' }
        };
    }
})