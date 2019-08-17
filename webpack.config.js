const path                    = require( 'path' )
const WebpackBar              = require( 'webpackbar' )
const HTMLPlugin              = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' )
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' )
const UglifyJsPlugin          = require( 'uglifyjs-webpack-plugin' )

console.info( 'process.env.NODE_ENV: >>>>======>>>>>> ', process.env.NODE_ENV )

module.exports = {
	
	entry:        './src/index.js',
	output:       {
		path:     path.resolve( __dirname, 'dist' ),
		filename: "[name].js",
		sourceMapFilename: "[name].js.map"
		
	},
//	devtool: "source-map",
	devtool: 'cheap-module-source-map',
	devServer:    {
		contentBase: path.resolve( __dirname, 'dist' ),
		port:        4200
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin( {} ),
			new UglifyJsPlugin( {} )
		]
	},
	plugins:      [
		new WebpackBar(),
		new HTMLPlugin( {
			filename: 'index.html',
			template: './src/index.html'
		} ),
		new MiniCssExtractPlugin( {
			filename: 'style.css'
		} )
	],
	resolve:      {
		extensions: [ '.js', '.ts' ]
	},
	module:       {
		rules: [
			{
				test: /\.css$/,
				use:  [
					process.env.NODE_ENV !== 'production'
					? 'style-loader'
					: MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options:
						        { sourceMap: true }
					} ]
			},
			{
				test: /\.scss$/,
				use:  [
					process.env.NODE_ENV !== 'production'
					? 'style-loader'
					: MiniCssExtractPlugin.loader,
					{
						loader:  'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader:  'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.less$/,
				use:  [
					process.env.NODE_ENV !== 'production'
					? 'style-loader'
					: MiniCssExtractPlugin.loader,
					{
						loader:  'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader:  'less-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test:    /\.(js|ts)$/,
				exclude: /node_modules/,
				loader:  'babel-loader'
			}
		]
	}
}
