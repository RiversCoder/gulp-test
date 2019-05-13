// 打包压缩合并js文件成一个文件 压缩JS

let gulp = require("gulp");
let uglify = require("gulp-uglify");
let concat = require("gulp-concat");


gulp.task("default", function(){
    // 将你默认的任务代码放在这里
    console.log("Ok");

    return gulp.src("./js/*.js")
        .pipe(uglify()) //压缩 获取到的js 不写不压缩
        .pipe(concat("all.min.js")) //将该目录下所有的js文件合并到一个名为all.min.js的文件
        .pipe(gulp.dest("./dist/js/")); //将all.min.js文件输出到dist/js/目录下
});



