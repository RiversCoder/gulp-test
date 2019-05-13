// 在打包合并js文件之后 才打包合并css文件

let gulp = require("gulp");
let uglify = require("gulp-uglify");  // 压缩 js
let concat = require("gulp-concat"); // 合并文件
let uglify_css = require("gulp-minify-css") //压缩css


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

