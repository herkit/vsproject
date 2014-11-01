var libxmljs = require('libxmljs');
var fs = require('fs');
var path = require('path');

var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

var sourcedir = path.dirname(argv._[0]);
var destdir = path.dirname(argv.o);

console.log(path.relative(argv.o, argv._[0]));

fs.readFile(argv._[0], {encoding: "utf8"}, function (err, data) {
  if (err) throw err;
  var xml = libxmljs.parseXml(data);

  var compiles = xml.find("//p:Compile", { p: "http://schemas.microsoft.com/developer/msbuild/2003" });

  compiles.forEach(function(c) {
  	var projectpath = c.attr("Include").value();
  	var sourcepath = path.join(sourcedir, projectpath);
  	var relativepath = path.relative(destdir, sourcepath);
  	c.attr("Include", relativepath);
  	console.log(sourcepath + " => " + relativepath)
  	var linknode = c.node("Link", projectpath);
  });

  fs.writeFile(argv.o, xml.toString(), function(err) {
  	if (err) throw err;
  	console.log("File saved to " + argv.o);
  });
});