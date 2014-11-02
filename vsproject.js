var path = require('path');
var fs = require('fs');
var libxmljs = require('libxmljs');

module.exports = {
  translateReferences: function (xml, xmlns, sourcedir, destdir) {
    var references = xml.find("//p:Reference/p:HintPath", xmlns);
    references.forEach(function(ref) {
      var refpath = path.join(sourcedir, ref.text());
      var newrefpath = path.relative(destdir, refpath);
      ref.text(newrefpath);
    });
  },
  Project: function(filename) {
    var data = fs.readFileSync(filename, {encoding: "utf8"});
    this.file = filename;
    this.dir = path.dirname(filename);
    this.dom = libxmljs.parseXml(data);
    this.xmlns = { p: "http://schemas.microsoft.com/developer/msbuild/2003" };
  }
};