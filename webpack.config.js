const path                    = require( 'path' )
const WebpackBar              = require( 'webpackbar' )
HtmlWebpackPlugin             = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' )
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' )
const TerserPlugin            = require( 'terser-webpack-plugin' )
const { CleanWebpackPlugin }  = require( 'clean-webpack-plugin' )
const CopyWebpackPlugin       = require( 'copy-webpack-plugin' )

const PATHS = {
	src:    path.join( __dirname, 'src' ),
	dist:   path.join( __dirname, 'dist' ),
	assets: 'assets/'
}

module.exports = {
	entry:        PATHS.src,
	output:       {
		filename:   `${ PATHS.assets }js/[name].js`,
		path:       PATHS.dist,
		publicPath: '/'
	},
	devtool:      'cheap-module-eval-source-map',
	devServer:    {
		contentBase: PATHS.dist,
		compress:    true,
		port:        4200,
		overlay:     {
			warnings: true,
			errors:   true
		}
	},
	optimization: {
		minimizer: [ new TerserPlugin(),
		             new OptimizeCssAssetsPlugin( {} )
		]
	},
	plugins:      [
		new CleanWebpackPlugin(),
		new WebpackBar(),
		new HtmlWebpackPlugin( {
			filename: 'index.html',
			template: `${ PATHS.src }/index.html`
		} ),
		new MiniCssExtractPlugin( {
			filename: `${ PATHS.assets }css/[name].css`
		} ),
		new CopyWebpackPlugin( [
			{
				from: `${ PATHS.src }/assets/img/`,
				to:   `${ PATHS.dist }/assets/img/[name].[ext]`
			}
		] )
	],
	module:       {
		rules: [
			{
				test: /\.css$/i,
//				use:  [ 'style-loader', 'css-loader' ]
				use:  [ MiniCssExtractPlugin.loader,
				        {
					        loader:  'css-loader',
					        options: {}
				        }
				]
			},
//			{
//				test: /\.scss$/,
//				use:  [
//					'style-loader', // creates style nodes from JS strings
//					'css-loader', // translates CSS into CommonJS
//					'sass-loader' // compiles Sass to CSS, using Node Sass by default
//				]
//			},
			{
				test: /\.(sa|sc)ss$/,
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
						loader:  'postcss-loader',
						options: {
							sourceMap: true,
							config:    { path: `./postcss.config.js` }
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
				test: /\.(gif|png|jpe?g|svg)$/i,
				use:  [
					{
						loader:  'file-loader',
						options: {
							name:            '[name].[ext]',
							outputPath:      `${ PATHS.assets }img`,
							useRelativePath: true
						}
					},
					{
						loader:  'image-webpack-loader',
						options: {
							mozjpeg:  {
								progressive: true,
								quality:     65
							},
							// optipng.enabled: false will disable optipng
							optipng:  {
								enabled: false
							},
							pngquant: {
								quality: '65-90',
								speed:   4
							},
							gifsicle: {
								interlaced: false
							},
							// the webp option will enable WEBP
							webp:     {
								quality: 75
							}
						}
					}
				]
			},
			{
				test:    /\.js$/,
				exclude: /node_modules/,
				loader:  'babel-loader'
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use:  [
					{
						loader:  'file-loader',
						options: {
							name:       '[name].[ext]',
							outputPath: `${ PATHS.assets }fonts`
						}
					}
				]
			}
		]
	}
	
}
