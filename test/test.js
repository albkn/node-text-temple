var temple = require('../text-temple.js');
var fs = require('fs');
var path = require('path');

var success = 0;

// Test 1: basic variable injection
var data1 = {
  webGitURL: 'https://bitbucket.org/tadf/web.git',
  mobileGitURL: 'https://@bitbucket.org/tadf/mobile.git',
};
var test1 = test('/expected1.txt', 'test1.tmpl', data1, '/output1.txt');
if (test1) {
  console.log('Test 1: variable injection test passed! You are awesome!');
  success++;
} else {
  console.log('Test 1: failed! Try again!');
}

// Test 2: basic each loop 
var data2 = {
  copyFiles: [0,1,2,3,4,],
  addFiles: [
    {from: '/tmp/xyz', to: '/home/app/private/'},
    {from: '/tmp/temp/xyz', to: '/home/app/public/'},
    {from: '/a', to: '/home/app/lib/collections/schemas'},
  ],
};
var test2 = test('/expected2.txt', 'test2.tmpl', data2, '/output2.txt');
if (test2) {
  console.log('Test 2: un-nested {{#each}} test passed! You\'re killing it!');
  success++;
} else {
  console.log('Test 2: failed! Try again!');
}

// Test 2: basic each loop 
var data3 = {
  yes: true,
  sameLine: 12
};
var test3 = test('/expected3.txt', 'test3.tmpl', data3, '/output3.txt');
if (test3) {
  console.log('Test 3: un-nested {{#if}} test passed! Are you a Googler?');
  success++;
} else {
  console.log('Test 3: failed! Try again!');
}


if (success === 3) {
  console.log('===================');
  console.log('All test passed! Great job mate ;-)');
  console.log('===================');
}


function test(expectedFile, templateFile, data, outputFile) {
  temple.compileFile(templateFile, data, '.'+outputFile);
  var result = fs.readFileSync(path.dirname(require.main.filename) + outputFile, {encoding: 'utf8'});
  var expected = fs.readFileSync(path.dirname(require.main.filename) + expectedFile, {encoding: 'utf8'});
  
  if (result === expected) return true;
  return false;
}
