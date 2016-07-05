var appRoot = require('app-root-path') + '';
var fs = require('fs');
var path = require('path');
var sassSources = [];

// Collect the bower.json files from each of the installed components
var bowerPath = path.join(appRoot, 'bower_components');
var bowerComponents = fs.readdirSync(bowerPath).filter(function(entry) {
  return fs.statSync(path.join(bowerPath, entry)).isDirectory();
});
var bowerFiles = bowerComponents.map(function(component) {
  return path.join(bowerPath, component, 'bower.json');
});

// Read each of the bower.json files to find the main file
// and add the directory to the list of CSS and JS sources
bowerFiles.forEach(function(bowerFile) {
  var bowerConfig = require(bowerFile);
  if (bowerConfig.main === undefined) {
    return;
  }

  // Find the main file(s) specified by bower.json
  var mainFiles = bowerConfig.main;
  if (typeof(mainFiles) === 'string') {
    mainFiles = [mainFiles];
  }

  // Add the directory of each main file as a CSS and JS source
  mainFiles.forEach(function(file) {
    var componentPath = path.dirname(bowerFile);
    var filePath = path.dirname(file);
    var source = path.join(componentPath, filePath).replace(appRoot + '/', '');
    sassSources.push(source);
  });
});

module.exports = sassSources;
