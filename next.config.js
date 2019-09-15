const withCSS = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');
const GoogleFontsPlugin = require('google-fonts-plugin');

module.exports = withCSS({
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(ttf|eot|svg|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'file-loader'
            }]
        })

        config.plugins.push(new Dotenv({
            systemvars: true,
        }));

        config.plugins.push(new GoogleFontsPlugin({
            fonts: [
                {
                    family: 'Lexend Deca',
                    variants: [
                        '400'
                    ],
                },
            ],
            formats: [
                'woff',
                'woff2'
            ],
            filename: './static/css/fonts.css',
        }));

        return config;
    },
    exportPathMap: function() {
        return {
            '/': { page: '/' }
        };
    }
})