
### **7. 使用gulp-plumber处理错误进程**

//  错误处理 gulp-plumber 
/*
    gulp 的错误处理有点坑，假如发生错误进程就挂了。相对的解决办法不少，但是这个是我个人比较推荐的，这个插件可以阻止 gulp 插件发生错误导致进程退出并输出错误日志。
 */
let gulp = require("gulp");
let concat = require("gulp-concat"); // 合并文件
let uglify_css = require("gulp-minify-css") //压缩css
let sass = require("gulp-ruby-sass")
let plumber = require("gulp-plumber")

gulp.task("task-sass", (done) => {
    sass("./scss/*.scss", {style: "compressed"})
        .pipe(plumber())
        .pipe(concat("scss.min.css"))
        .pipe(gulp.dest("./dist/scss-css/"))
    done()
})

function sassedit(cb){
    gulp.watch(["./scss/*.scss"], gulp.series("task-sass"))
    cb()
}

exports.sassedit = sassedit;

# 8.打包压缩图片
![Alt text](http://pic9.nipic.com/20100923/2531170_140325352643_2.jpg "Optional title")
![Alt text](../images/02.jpg "Optional title")
