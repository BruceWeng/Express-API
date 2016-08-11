module.exports = {
  entry: './src/app.js',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 8888
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
