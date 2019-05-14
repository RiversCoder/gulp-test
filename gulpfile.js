
/*
		 常用插件地址：

		 	http://pinkyjie.com/2015/08/02/commonly-used-gulp-plugins-part-1/

 */

//  错误处理 gulp-plumber 
/*
	gulp 的错误处理有点坑，假如发生错误进程就挂了。相对的解决办法不少，但是这个是我个人比较推荐的，这个插件可以阻止 gulp 插件发生错误导致进程退出并输出错误日志。
 */
let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf"}});
// let plumber = require("gulp-plumber")

gulp.task("task-html", (done) => {
    gulp.src("./gitbook/*.md")
    	.pipe($.plumber())
    	.pipe($.mdpdf())
        .pipe(gulp.dest("./dist/md-pdf/"))
       
    done()
})

function sassedit(cb){
	gulp.watch(["./gitbook/*.md"], gulp.series("task-html"))
	cb()
}

exports.default = sassedit;



