### **13. 删除指定文件夹目录下面的所有文件 **

```js
let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf"}});

function clean(done){
    gulp.src("./dist/less-css/*")
        .pipe($.clean())
    done()
}

function lessTocss(done){
    gulp.src("./less/*.less")
        .pipe($.less())
        .pipe(gulp.dest("./dist/less-css/"))
        done()
}

exports.less = gulp.series(clean,lessTocss)
```

### **14. gulp添加版本号解决静态资源缓存问题 **

