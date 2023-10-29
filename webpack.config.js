const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },
  mode: 'development',
  resolve: {
    fallback: {
        "fs": false,
        "path": false,
        "os": false
    },
}
};