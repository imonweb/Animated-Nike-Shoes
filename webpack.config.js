const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'myBundle.js'
  },
  devServer: {
    before: function(dist, server){
      server._watch('./dist/*.html')
    },
    contentBase: path.join(__dirname, 'src'),
    port: 3000
  }
}