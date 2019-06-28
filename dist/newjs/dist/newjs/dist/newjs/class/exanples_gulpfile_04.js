// 监听文件改变 根据改变的内容 做出对应的处理

let gulp = require("gulp");
let uglify = require("gulp-uglify");  // 压缩 js
let concat = require("gulp-concat"); // 合并文件
let uglify_css = require("gulp-minify-css") //压缩css

gulp.task("watch_js",function(done){
	let watcher = gulp.watch(["./js/*.js"])

	//文件被修改
	/*
		'add', 'addDir', 'change', 'unlink', 'unlinkDir', 'ready', 'error', 'all'
	 */
	watcher.on("add", (path, stats) => {
		console.log(`File ${path} was added`); // File js\add.js was added
	})

	watcher.on("change", (path, stats) => {
		console.log(`File ${path} was changed`);
		console.log(stats)
		/*
				File js\main.js was changed
				Stats {
				  dev: 2061344865,
				  mode: 33206,
				  nlink: 1,
				  uid: 0,
				  gid: 0,
				  rdev: 0,
				  blksize: undefined,
				  ino: 281474977892971,
				  size: 89,
				  blocks: undefined,
				  atimeMs: 1557713477785.4734,
				  mtimeMs: 1557735218093.6597,
				  ctimeMs: 1557735218093.6597,
				  birthtimeMs: 1557713477785.4734,
				  atime: 2019-05-13T02:11:17.785Z,
				  mtime: 2019-05-13T08:13:38.094Z,
				  ctime: 2019-05-13T08:13:38.094Z,
				  birthtime: 2019-05-13T02:11:17.785Z 
				}
		 */
	})
	// watcher.close()
	done()
})	



/*gulp.task("watch_js",function(){
	return gulp.watch(["./js/*.js","./css/*.css","!./css/style.css"], gulp.series("scripts", "css"), function(cb){
		console.log("js、css修改文件被修改，已经自动打包压缩完成!")
		cb()
	})
})	*/


gulp.task("scripts", function(){
    return gulp.src("./js/*.js")
        .pipe(uglify()) //压缩 获取到的js 不写不压缩
        .pipe(concat("all.min.js")) //将该目录下所有的js文件合并到一个名为all.min.js的文件
        .pipe(gulp.dest("./dist/js/")); //将all.min.js文件输出到dist/js/目录下
});

gulp.task("css", function(){
	return gulp.src("./css/*.css")
        .pipe(uglify_css()) //压缩 获取到的css 不写不压缩
        .pipe(concat("all.min.css")) //将该目录下所有的css文件合并到一个名为all.min.css的文件
        .pipe(gulp.dest("./dist/css/")); //将all.min.css文件输出到dist/js/目录下
});

gulp.task("my-tasks", gulp.series("scripts", "css", function(){
	console.log("js、css打包完毕!")
}))

