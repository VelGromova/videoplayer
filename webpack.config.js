const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const spriteTemplateFunction = (data) => {
    let shared = '.icon { background-image: url(I); display: block; }'
        .replace('I', './../../' + data.sprites[0].image);

    let perSprite = data.sprites.map(sprite =>
        '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
            .replace('N', sprite.name)
            .replace('W', sprite.width)
            .replace('H', sprite.height)
            .replace('X', sprite.offset_x)
            .replace('Y', sprite.offset_y)
    ).join('\n');

    return shared + '\n' + perSprite;
}

module.exports = {
    entry: [
        './src/app.js',
        './src/assets/scss/_all.scss'
    ],
    output: {
        path: __dirname + '/dist',
        filename: './bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader?importLoaders=1',
                })
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!resolve-url-loader!sass-loader'
                })
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'base64-inline-loader?limit=10000&name=[name].[ext]'

            }
        ]
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, './src/assets/icons'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, './src/assets/images/sprite.png'),
                css: [
                    [ path.resolve(__dirname, './src/assets/scss/__sprite.scss') ],
                    [
                        path.resolve(__dirname, './src/assets/scss/__icons.scss'),
                        { format: 'icon_template' },
                    ]
                ]
            },
            customTemplates: {
                'icon_template': spriteTemplateFunction,
            },
            apiOptions: {
                cssImageRef: "./assets/images/sprite.png"
            }
        }),

        new ExtractTextPlugin({
            filename: './[name].css',
            allChunks: true,
        }),

        new HtmlWebpackPlugin({template: './src/index.html'}),

        new CopyWebpackPlugin([
            {
                from: './src/assets/images',
                to: './assets/images'
            }
        ])
    ]
};
