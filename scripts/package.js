#! /usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;
var pkg = require('../package.json');
var distDir = './dist/';
var buildDir = './build/';

if (!fs.existsSync(distDir)){
  fs.mkdirSync(distDir);
}

var zipFile = '../' + distDir + pkg.name + '-' + pkg.version + '.zip';
var cmd = `zip -r ${zipFile} ./*`

exec(cmd, { cwd: buildDir }, function(error, stdout, stderr) {
  if (error) {
    console.log('Error!', error, stderr);
  } else {
    console.log('All good! Chrome extension packaged into\n', zipFile);
  }
});
