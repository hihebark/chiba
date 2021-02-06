/**
 * Create a new collection
 * @param {String} options.name
 * @param {String} options.text
 * @param {String} options.path
 * @param {String} options.data
 */
function Template (options) {
  let name, text, data;
  this.name = options.name;
  this.text = options.path == undefined ? options.text : readFromFile(options.path);
  this.data = options.data || {};
}

const readFromFile = (path) => {
  const fs = require('fs');
  return fs.readFileSync(path, 'utf8');
}

Template.prototype.exec = function(data) {
  data = data == undefined ? this.data : data;
  let reg = /{{([^}}]+)?}}/g, match, text;
  while(match = reg.exec(this.text)) {
    let key = match[1].trim();
    let val = data[key];
    if (key.includes('.'))
      val = key.split('.').reduce((o,i)=>o[i], data);
    if (val != undefined)
      this.text = this.text.replace(match[0], val);
  }
  return this.text;
}

module.exports = Template;
