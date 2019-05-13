/* 
		使用新版gulp4 写法
*/

const { task } = require('gulp');

const clean = function(cb) {
  // body omitted
  console.log("clean")
  cb();
};
clean.displayName = 'clean:all';

task(clean);

function build(cb) {
  // body omitted
  console.log("build")
  cb();
}
build.description = 'Build the project';
build.flags = { '-e': 'An example flag' };

task(build);

/*
	
	D:\me\gulp\gulp-test>gulp --tasks
	[16:35:32] Tasks for D:\me\gulp\gulp-test\gulpfile.js
	[16:35:32] ├── clean:all
	[16:35:32] └── build      Build the project
	[16:35:32]     -e         …An example flag

 */