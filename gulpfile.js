let gulp = require("gulp");
let uglify = require("gulp-uglify");
let concat = require("gulp-concat");

gulp.task("default", function(){
    // 将你默认的任务代码放在这里
    console.log("Ok");

    return gulp.src("./js/*.js")
        .pipe(uglify())
        .pipe(concat("all.min.js"))
        .pipe(gulp.dest("./dist/js/"));
});



