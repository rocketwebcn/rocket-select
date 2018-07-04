const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

const extractLess = new ExtractTextWebpackPlugin({
	filename: 'css/[name]-build-[hash:5].css'
})

const config = {
	entry: {
		"rocketSelect": path.join(__dirname, '../src/app.js')
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		// publicPath: './dist/',
		filename: 'static/[name].[hash:8].js'
	},

	resolve: {
		extensions: ['.js', '.json', '.less']
	},

	module: {
		rules: [
			{
				test: /.js$/,
				use: [
					{
						loader: 'babel-loader'
					}
				],
				exclude: [
					path.join(__dirname, '../node_modules')
				]
			},
			{
				test: /.less$/,
				use: [
					{
						loader: 'style-loader',
					},

					{
						loader: 'css-loader',
					},

					{
						loader: 'less-loader'
					}
				]
			},

			{
				test: /.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name]-[hash:5].[ext]',
							limit: 1000,
							publicPath: '',
							outputPath: 'assets/imgs/',
						}
					}
				]
			},

			{
				test: /.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							attrs: ['img:src', 'img:data-src']
						}
					}
				]
			}
		]
	},
	plugins: [
		extractLess,

		// 处理html文件
		new HTMLPlugin({
			template: path.join(__dirname, '../index.html'),
			filename: 'index.html',
			minify: { // 压缩html文件
				collapseWhitespace: true
			}
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'mainfest'
		}),

		// new HtmlInlineChunkPlugin({
		// 	inlineChunks: ['mainfest']
		// }),

		new webpack.optimize.UglifyJsPlugin(),

		new CleanWebpackPlugin(['dist', 'dist/static/rocketSelect.*.js', 'dist/static/mainfest.*.js'],{
			root: __dirname,
			verbose:  true,  
            dry:      false  
		}),

		new webpack.HotModuleReplacementPlugin(),

		new webpack.NamedModulesPlugin()
	]
}

if (isDev) {
	config.devServer = {
		host: '127.0.0.1', // 访问地址
		port: '8899', // 访问端口号
		compress: true,
		contentBase: path.join(__dirname, '../dist'), // 访问路径
		hot: true,
		overlay: { // 调试错误用的
			errors: true
		},
		proxy: {
			'/api': {
				target: "http://192.168.73.253:38080",
				// pathRewrite: {'^/api' : ''}
			}
		},
		publicPath: '/', // webpack-dev-server 访问的路径
		historyApiFallback: true
	}
}

module.exports = config