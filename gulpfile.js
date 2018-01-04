var del = require("del");
var gulp = require("gulp");
var path = require("path");//Node.js
var sequence = require("gulp-sequence");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");


tsProject = ts.createProject("tsconfig.json");

var tsAbsoluteOutDir = tsProject.options.outDir;

var srcFolderName = "src";
var allFolders = "**";

var buildTask = "build";
var cleanTask = "clean";

var internalTypescriptTask = "_ts";

gulp.task(buildTask, sequence(
	internalTypescriptTask
));

gulp.task(cleanTask, function() {
	return del([tsAbsoluteOutDir]);
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
