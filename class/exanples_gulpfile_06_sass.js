// 编译 sass
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


