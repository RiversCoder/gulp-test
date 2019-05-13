// 打包合并css文件

let gulp = require("gulp");
let uglify = require("gulp-uglify");  // 压缩 js
let concat = require("gulp-concat"); // 合并文件
let uglify_css = require("gulp-minify-css") //压缩css

gulp.task('A' , function(){
   console.log('A') 
});
gulp.task('B' , ['A'] , function(){ //运行B之前先去运行A
   console.log('B')
});



