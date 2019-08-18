const path              = require( 'path' )
const merge             = require( 'webpack-merge' )
const baseWebpackConfig = require( './webpack.base.conf' )

const devWebpackConfig = merge( baseWebpackConfig, {
	// DEV settings gonna be here
	mode: 'development',
	
	devtool:   'cheap-module-eval-source-map',
	devServer: {
		// historyApiFallback: true,
		// noInfo: true,
		overlay:     {
			warnings: true,
			errors:   true
		},
//		contentBase: path.join( __dirname, 'dist' ),
		port:        4200
	}
} )
// export devWebpackConfig

module.exports = new Promise( (resolve, reject) => {
	return resolve( devWebpackConfig )
} )

