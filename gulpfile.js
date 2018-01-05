var del = require("del");
var execSync = require("child_process").execSync;//Node.js
var gulp = require("gulp");
var path = require("path");//Node.js
var sequence = require("gulp-sequence");
var sourcemaps = require("gulp-sourcemaps");
var through = require("through2");
var ts = require("gulp-typescript");


tsProject = ts.createProject("tsconfig.json");

var tsAbsoluteOutDir = tsProject.options.outDir;

var srcFolderName = "src";
var allFolders = "**";

var buildTask = "build";
var cleanTask = "clean";
var rebuildTask = "rebuild";

var internalCopyTask = "_copy";
var internalSrcCopyTask = "_copySrcFiles";
var internalTsoaTask = "_tsoa";
var internalTypescriptTask = "_ts";

var srcFilesToCopy = [
	path.join(srcFolderName, allFolders, "*.css"), 
	path.join(srcFolderName, allFolders, "*.html")
];

gulp.task(buildTask, sequence(
	internalTsoaTask, 
	[internalCopyTask, internalTypescriptTask]
));

gulp.task(cleanTask, function() {
	return del([tsAbsoluteOutDir]);
});

gulp.task(internalCopyTask, sequence(
	[internalSrcCopyTask]
));

gulp.task(rebuildTask, sequence(
	cleanTask, 
	buildTask
));

gulp.task(internalSrcCopyTask, function() {
	var src$ = gulp.src(srcFilesToCopy)
		.pipe(gulp.dest(tsAbsoluteOutDir))
	;
	return src$;
});

gulp.task(internalTsoaTask, function() {
	var globs = path.join(srcFolderName, allFolders, "tsoa.json");
	var src$ = gulp.src(globs, {read: false})
		.pipe(through.obj(function(file, enc, cb) { // see https://stackoverflow.com/questions/27923523/how-can-i-write-a-simple-gulp-pipe-function
			var folderPath = path.dirname(file.path);
			execSync("tsoa swagger", {cwd: folderPath});
			execSync("tsoa routes", {cwd: folderPath});
			cb(null, file);
		}))
	;
	return src$;
});

gulp.task(internalTypescriptTask, function() {
	var writeOptions = {
		sourceRoot: "."	// see https://github.com/Microsoft/vscode/issues/14988
	};
	var src$ = gulp.src(path.join(srcFolderName, allFolders, "*.ts"))
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.pipe(sourcemaps.write(".", writeOptions))
		.pipe(gulp.dest(tsAbsoluteOutDir))
	;
	return src$;
});
