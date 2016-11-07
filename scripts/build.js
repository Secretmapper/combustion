process.env.NODE_ENV = 'production';

var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var filesize = require('filesize');
var gzipSize = require('gzip-size').sync;
var rimrafSync = require('rimraf').sync;
var webpack = require('webpack');
var config = require('../config/webpack.config.prod');
var paths = require('../config/paths');

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
rimrafSync(paths.appBuild + '/*');

console.log('Creating an optimized production build...');
webpack(config).run(function(err, stats) {
  if (err) {
    console.error('Failed to create a production build. Reason:');
    console.error(err.message || err);
    process.exit(1);
  }

  console.log(chalk.green('Compiled successfully.'));
  console.log();

  console.log('File sizes after gzip:');
  console.log();
  var assets = stats.toJson().assets
    .filter(asset => /\.(js|css)$/.test(asset.name))
    .map(asset => {
      var fileContents = fs.readFileSync(paths.appBuild + '/' + asset.name);
      var size = gzipSize(fileContents);
      return {
        folder: path.join('build', path.dirname(asset.name)),
        name: path.basename(asset.name),
        size: size,
        sizeLabel: filesize(size)
      };
    });
  assets.sort((a, b) => b.size - a.size);

  var longestSizeLabelLength = Math.max.apply(null,
    assets.map(a => a.sizeLabel.length)
  );
  assets.forEach(asset => {
    var sizeLabel = asset.sizeLabel;
    if (sizeLabel.length < longestSizeLabelLength) {
      var rightPadding = ' '.repeat(longestSizeLabelLength - sizeLabel.length);
      sizeLabel += rightPadding;
    }
    console.log(
      '  ' + chalk.green(sizeLabel) +
      '  ' + chalk.dim(asset.folder + path.sep) + chalk.cyan(asset.name)
    );
  });
  console.log();
});
