var libxmljs = require('libxmljs');
var fs = require('fs');
var path = require('path');
var vsproject = require('./vsproject');
var Project = vsproject.Project;

var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

if (argv._.length < 2) {
  console.log("You need to specify input and output files");
  return;
}

var sourcefile = argv._[0];
var sourcedir = path.dirname(sourcefile);
var destfile = argv._[1];
var destdir = path.dirname(destfile);

var filterpattern = argv.f;
var excludepattern = argv.e;

var preview = argv.preview || false;

console.log(path.relative(destfile, argv._[0]));

var project = new Project(sourcefile);

var xml = project.dom;
var xmlns = { p: "http://schemas.microsoft.com/developer/msbuild/2003" };

var compiles = xml.find("//p:Compile", xmlns);


vsproject.translateReferences(xml, xmlns, sourcedir, destdir);


compiles.forEach(function(c) {
	var projectpath = c.attr("Include").value();

	if (typeof(filterpattern) === "string") {
    console.log("Checking file " + projectpath + " against " + argv.e);
		if (!projectpath.match(filterpattern))
    {
      console.log("Removing " + c.toString());
      c.remove();
      return;
    }
  }

  if (typeof(excludepattern) === "string") {
    if (projectpath.match(excludepattern))
    {
      console.log("Removing " + c.toString());
      c.remove();
      return;
    }
  }

	var sourcepath = path.join(sourcedir, projectpath);
	var relativepath = path.relative(destdir, sourcepath);
	c.attr("Include", relativepath);
	var linknode = c.node("Link", projectpath);
});

if (!preview) {
  fs.writeFile(destfile, xml.toString(), function(err) {
		if (err) throw err;
		console.log("File saved to " + destfile);
	});
} else {
	console.log(xml.toString());
}