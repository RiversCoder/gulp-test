// 编译 sass
/*
		
		如果本机没有安装过ruby，需要如下操作进行：

		Install Ruby on your machine Download Link
		Add ruby bin folder path to path user and system variable
		Open the command prompt in your system and install sass globally so you don't need to be in the ruby folder using the following command:

		gem install sass 

 */
let gulp = require("gulp");
let babel = require("gulp-babel")
let uglify = require("gulp-uglify");  // 压缩 js
let concat = require("gulp-concat"); // 合并文件
let uglify_css = require("gulp-minify-css") //压缩css
let sass = require("gulp-ruby-sass")

gulp.task("task-sass", (done) => {
    sass("./scss/*.scss", {style: "compressed"})
        .pipe(concat("scss.min.css"))
        .pipe(gulp.dest("./dist/scss-css/"))
    done()
})


