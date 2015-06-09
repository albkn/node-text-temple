var temple = require('../temple.js');
var fs = require('fs');
var path = require('path');

var data = {
  webGitURL: 'https://bitbucket.org/tadf/web.git',
  mobileGitURL: 'https://@bitbucket.org/tadf/mobile.git',
};

temple.compileFile('test.tmpl', data, './Dockerfile');

var result = fs.readFileSync(path.dirname(require.main.filename) + '/Dockerfile', {encoding: 'utf8'});
var expected = fs.readFileSync(path.dirname(require.main.filename) + '/output.txt', {encoding: 'utf8'});

if (result === expected) {
  console.log('Test success, you are awesome !!!');
} else {
  console.log('Test failed, try again !!!');
}
