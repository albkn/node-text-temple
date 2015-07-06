var TOKENS = require('./config.js').TOKENS;

function processEACH(content, data) {
  var resString = '';
  for (var i = 0; i < data.length; i++) {
    resString += compile(content, data[i]).replace(/^\n/, '');
  }
  return resString.replace(/\n$/, '');
}

function processIF(content, data) {
  if (!data) return '';
  return compile(content, data).replace(/^\n/, '').replace(/\n$/, '');
}

function compile(content, data) {
  var resString = '';
  var variable = '';
  var tag = '';
  var openPos = 0;
  var closePos = 0;
  var tempPointer = 0;
  
  openPos = content.indexOf(TOKENS.OPEN, closePos);
  while (openPos !== -1) {
    // Copy all text between last closePos and current openPos
    resString += content.slice(closePos, openPos);
    
    // Get current tag
    closePos = content.indexOf(TOKENS.CLOSE, openPos+TOKENS.OPEN.length) + TOKENS.CLOSE.length;
    tag = content
      .slice(openPos+TOKENS.OPEN.length, closePos-TOKENS.CLOSE.length)
      .trim();
    
    // Handle tokens
    if (tag.match(/^\#if/)) {
      /* IF TOKEN */
      // Get variable name and position of closing {{/if}} token
      variable = content
        .slice(openPos+TOKENS.IF_OPEN.length, closePos-TOKENS.CLOSE.length)
        .trim();
      tempPointer = content.indexOf(TOKENS.IF_END, closePos);
      // Do processing
      resString += processIF(
        content.slice(closePos, tempPointer), 
        data[variable]
      );
      // Update end pointer to the closing {{/if}} token
      closePos = tempPointer + TOKENS.IF_END.length;
    } else if (tag.match(/^\#each/)) {
      /* EACH TOKEN */
      // Get variable name and position of closing {{/each}} token
      variable = content
        .slice(openPos+TOKENS.EACH_OPEN.length, closePos-TOKENS.CLOSE.length)
        .trim();
      tempPointer = content.indexOf(TOKENS.EACH_END, closePos);
      // Do processing
      resString += processEACH(
        content.slice(closePos, tempPointer), 
        data[variable]
      );
      // Update end pointer to the closing {{/each}} token
      closePos = tempPointer + TOKENS.EACH_END.length;
    } else {
      // Variable statement
      variable = tag;
      if (data[variable]) resString += data[variable];
    }

    // Update openPos
    openPos = content.indexOf(TOKENS.OPEN, closePos);
  }
  
  // Copy final bits between last closePos to end of file
  resString += content.slice(closePos);
  return resString;
}

module.exports = {
  compile: compile,
};
