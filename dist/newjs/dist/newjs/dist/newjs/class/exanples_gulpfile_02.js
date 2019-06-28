// 打包合并css文件

let gulp = require("gulp");
let uglify = require("gulp-uglify");  // 压缩 js
let concat = require("gulp-concat"); // 合并文件
let uglify_css = require("gulp-minify-css") //压缩css

gulp.task("default", function(){
    // 将你默认的任务代码放在这里
    console.log("Ok");

    return gulp.src("./css/*.css")
        .pipe(uglify_css()) //压缩 获取到的css 不写不压缩
        .pipe(concat("all.min.css")) //将该目录下所有的css文件合并到一个名为all.min.css的文件
        .pipe(gulp.dest("./dist/css/")); //将all.min.css文件输出到dist/js/目录下
});

