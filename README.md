{
  "name": "webformyself-webpack",
  "version": "1.0.0",
  "description": "webpack project",
  "main": "index.js",
  "scripts": {
    "dev": "webpack --mode development",
    "dev:watch": "webpack --mode development --watch",
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development --open"
  },
  "keywords": [
    "javascript",
    "js",
    "webpack"
  ],
  "author": "Vladilen Minin",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.2.3",
    "@babel/preset-react": "^7.0.0",
    "@babel/preset-typescript": "^7.1.0",
    "babel-loader": "^8.0.4",
 

  },
  "dependencies": {
    "@babel/polyfill": "^7.2.5",
    "jquery": "^3.3.1",
    "react": "^16.7.0",
    "react-dom": "^16.7.0"
  }
}

 

  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      { 
        test: /\.(js|ts)$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }
    ]
  }
}


