var path = require('path');

module.exports = {
  translateReferences: function (xml, xmlns, sourcedir, destdir) {
    var references = xml.find("//p:Reference/p:HintPath", xmlns);
    references.forEach(function(ref) {
      var refpath = path.join(sourcedir, ref.text());
      var newrefpath = path.relative(destdir, refpath);
      ref.text(newrefpath);
    });
  }
};