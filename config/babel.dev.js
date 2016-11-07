module.exports = {
  babelrc: false,
  presets: [
    'babel-preset-react',
    'babel-preset-es2015',
    'babel-preset-stage-1'
  ].map(require.resolve),
  plugins: [
    'react-hot-loader/babel',
    'babel-plugin-transform-decorators-legacy',
    'babel-plugin-transform-object-rest-spread',
    'babel-plugin-syntax-trailing-function-commas'
  ]
};
