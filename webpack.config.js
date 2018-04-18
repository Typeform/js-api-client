const path = require('path')

module.exports = {
  entry: './src/typeform.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: ['typeformAPI'],
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}
