const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  const resolvePath = subPath => path.resolve(__dirname, `../${subPath}`)

  const paths = {
    build: resolvePath('build'),
    entry: resolvePath('src/index.js'),
    template: resolvePath('src/index.template.html'),
    src: resolvePath('src'),
    favicon: resolvePath('src/images/favicon.ico'),
    images: resolvePath('src/images'),
    styles: resolvePath('src/styles'),
    uiKitStyles: resolvePath('src/ui-kit'),
    routesStyles: resolvePath('src/routes'),
    vendorStyles: resolvePath('src/styles/vendor'),
  }

  const styleLoader = {
    loader: 'style-loader',
  }

  const sassLoader = {
    loader: 'sass-loader',
  }

  const baseCssLoader = {
    loader: 'css-loader',
  }

  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: function () {
        return [
          require('precss'),
          require('autoprefixer')
        ];
      }
    }
  }


  const moduleCssLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: {
        localIdentName: "[name]__[local]___[hash:base64:5]",
        context: paths.src
      }
    },
  }

  const extractPlugin = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: paths.build,
      hmr: true,
    },
  }

  const rules = [
    {
      test: /\.html$/,
      use: {
        loader: "html-loader",
        options: {
          minimize: true
        }
      }
    },
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.scss$/,
      include: [paths.vendorStyles],
      use: [styleLoader, baseCssLoader, postCssLoader, sassLoader],
    },
    {
      test: /\.scss$/,
      include: [paths.src, paths.styles, paths.uiKitStyles, paths.routesStyles],
      exclude: [paths.vendorStyles],
      use: [extractPlugin, moduleCssLoader, sassLoader],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      include: [paths.images],
      loader: "file-loader",
    },
    {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    },
    {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      ]
    },
  ]

  const plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.template,
      favicon: paths.favicon
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ]
  return (
    {
      entry: paths.entry,
      mode: "development",
      output: {
        publicPath: 'http://localhost:8080/',
        path: paths.build,
        filename: '[name].js',
      },
      plugins,
      context: paths.src,
      resolve: {
        modules: [
          paths.src,
          'node_modules',
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
      devServer: {
        contentBase: path.join(__dirname, "../build", "../src"), // TODO: check
        compress: true,
        port: 8080,
        watchContentBase: true,
        progress: true,
        hot: true,
        inline: true,
        historyApiFallback: true
      },
      module: { rules }
    }
  )
}
