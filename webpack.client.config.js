const fs = require('fs');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// For externals
const pkg = require('./package.json');
const deps = require('./package.json').dependencies;

const PATHS = {
    app: path.join(__dirname, 'client'),
    dist: path.join(__dirname, 'dist/static'),
    assets: path.join(__dirname, 'public'),
    public: '/',
};

const entry = {
    app: path.join(PATHS.app, 'index.tsx'),
};

const loadCSS = (paths, env, dontHash) => {
    const miniCssExtractPlugin = new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: (env === 'development' || dontHash) ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: (env === 'development' || dontHash) ? '[id].css' : '[id].[contenthash].css',
    });

    const response = {
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                          "autoprefixer",
                                          {},
                                        ],
                                    ],
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            miniCssExtractPlugin,
        ],
    };

    if (paths) {
        response.module.rules[0].include = paths;
    }

    return response;
};

// This allows us to output multiple css theme files
// fs.readdirSync(PATHS.themes).forEach((pathName) => {
//     if (pathName !== '_sample') {
//         entry[`theme-${pathName}`] = `${PATHS.themes}/${pathName}/index.ts`;
//     }
// });

const common = merge([
    {
        entry,
        output: {
            path: PATHS.dist,
            filename: '[name].js',
            publicPath: PATHS.public,
            libraryTarget: 'umd',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
            fallback: {
                os: false,
                zlib: false,
                http: false,
                https: false,
                stream: false,
                tty: false,
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: [PATHS.app],
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.jsx?$/,
                    include: [PATHS.app],
                    use: ['babel-loader'],
                },
            ],
          },
        optimization: {
            emitOnErrors: true,
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new ModuleFederationPlugin({
                shared: {
                    axios: {
                        eager: true,
                        requiredVersion: deps.axios,
                        singleton: true,
                    },
                },
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [PATHS.dist],
            }),
            new DuplicatePackageCheckerPlugin(
                {
                    // Also show module that is requiring each duplicate package (default: false)
                    verbose: true,
                }
            ),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: PATHS.assets,
                        to: PATHS.dist,
                    },
                ],
            }),
        ],
        devtool: 'source-map',
        externals: Object.keys(pkg.peerDependencies || {}),
    },
]);

const buildDev = () => merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                template: 'client/index.html',
                inject: true,
            }),
        ],
    },
    common,
    {
        mode: 'development',
    },
    loadCSS(null, 'development'),
]);

const buildProd = () => merge([
    common,
    {
        mode: 'production',
    },
    // analyzeBundle(),
    {
        plugins: [new ESLintPlugin({
            emitWarning: true,
        })],
    },
    loadCSS(null, 'production'),
    {
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        warnings: false,
                    },
                    ecma: 2015,
                    mangle: true,
                },
            })],
        }
    }
]);

module.exports = (env) => {
    console.log('Frontend Environment Variables', env);
    process.env.BABEL_ENV = env.production ? 'production' : 'development';

    if (env.production) {
        return [buildProd()];
    }

    return [buildDev()];
};
