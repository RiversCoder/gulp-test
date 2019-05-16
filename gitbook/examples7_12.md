
### **7. 使用gulp-plumber处理错误进程**
````
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
```js

### **8. 使用 gulp-markdown-pdf 将markdown文件转换成pdf文件**
```js
//  把markdown文件转换成带有一定风格样式的PDF文件
let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf"}});

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
```

### **9. 使用 gulp-imagemin 压缩图片 **
```js
//  压缩图片 可压缩图片的格式有 gif jpeg png
//  文档参数地址：https://www.npmjs.com/package/gulp-imagemin -- 效果不大 
let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf"}});

gulp.task("task-image", (done) => {
    gulp.src("./images/*")
        .pipe($.plumber())
        .pipe($.imagemin({progressive: true})) 
        .pipe(gulp.dest("./dist/images/"))
    done()
})
```


### **10. 使用 gulp-htmlmin 压缩html **
```js
//  压缩html 把空格都压缩掉
//  文档参数地址：gulp-htmlmin -- 效果不大 
let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf"}});

gulp.task("task-html", (done) => {
    gulp.src("./index.html")
        .pipe($.htmlmin({ collapseWhitespace: true })) //
        .pipe(gulp.dest("./dist/html/"))
    done()
})
```

### **11. 修改本地html文件，自动刷新web页面，并且自动生成压缩html **
```js

// 这里也可以扩展成 修改本地scss、less文件，自动刷新页面，原理是一样的

let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf"}});

gulp.task("task-connect", (done) => {
    $.connect.server({
         livereload:true,
         root:"./",
         port:8080
    })
    done()
})

function html() {
  return gulp.src('./*.html')
    .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/html/'))
    .pipe($.connect.reload());
}


function htmledit(cb){
    gulp.watch(["./*.html"], gulp.series( html))
    cb()
}

exports.default = gulp.series("task-connect", htmledit);
```

### **12. 编译less成css **

```js
let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf"}});

function lessTocss(done){
    gulp.src("./less/*.less")
        .pipe($.less())
        .pipe(gulp.dest("./dist/less-css/"))
        done()
}

exports.less = lessTocss

```




