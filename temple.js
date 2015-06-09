var fs = require('fs');
var path = require('path');
var config = require('./config.js');
var API = {};

function hasCorrectExtension(filePath) {
  return (path.extname(filePath) === config.extName) ? true : false;
}
API.hasCorrectExtension = hasCorrectExtension;

function absolutizePath(filePath) {
  if (path.isAbsolute(filePath)) return filePath;
  return path.resolve(path.dirname(require.main.filename), filePath);
}
API.absolutizePath = absolutizePath;

function compileString(templateString, data) {
  var res = templateString;

  // Replace all defined data properties in templateString
  // Note: currently using regex
  for (var property in data) {
    if (!data.hasOwnProperty(property)) continue;
    // Do regex replace
    var reProperty = config.openingToken +
      '\ *' +
      property +
      '\ *' +
      config.closingToken;
    var currRegexp = new RegExp(reProperty, 'g');
    res = res.replace(currRegexp, data[property]);
  }

  // Replace all not define data properties to empty strings ('')
  var reEmpty = config.openingToken + '.*?' + config.closingToken;
  res = res.replace(new RegExp(reEmpty, 'g'), '');
  return res;
}
API.compileString = compileString;


function compileFile(templateFile, data, resultFile, callback) {
  // Normalize template file
  var templatePath = absolutizePath(templateFile);
  var resultPath = absolutizePath(resultFile);
  var error;
  var result;

  // Make sure template file has the correct extension or no extension
  if (path.extname(templatePath) === '') {
    // No extension, then add extension
    templatePath += config.extName;
  } else if (!hasCorrectExtension(templatePath)) {
    // File has got wrong extension name
    error = new Error('File: wrong extension name');
    if (callback) return callback(error);
    throw error;
  }

  // Do read file, compile, and write to file
  if (callback) {
    // Asyc version
    fs.readFile(templatePath, {encoding: 'utf8'}, function(err, res) {
      if (err) throw err;
      result = compileString(res, data);
      fs.writeFile(resultPath, result, function(err, res) {
        if (err) throw err;
        callback();
      });
    });
  } else {
    // Sync version
    var templateString = fs.readFileSync(templatePath, {encoding: 'utf8'});
    result = compileString(templateString, data);
    fs.writeFileSync(resultPath , result);
  }
}
API.compileFile = compileFile;

module.exports = API;
