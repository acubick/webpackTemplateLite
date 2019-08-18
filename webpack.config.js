const path                    = require( 'path' )
HtmlWebpackPlugin             = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' )
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' )
const TerserPlugin            = require( 'terser-webpack-plugin' )

module.exports = {
	entry:        './src/index.js',
	output:       {
		filename: 'bundle.js',
		path:     path.resolve( __dirname, 'dist' )
	},
	devServer:    {
		contentBase: path.join( __dirname, 'dist' ),
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
		new HtmlWebpackPlugin( {
			filename: 'index.html',
			template: './src/index.html'
		} ),
		new MiniCssExtractPlugin( {
			filename: 'style.css'
		} )
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
			{
				test:    /\.js$/,
				exclude: /node_modules/,
				loader:  'babel-loader'
			}
		]
	}
	
}
