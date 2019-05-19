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
```js
let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf", "gulp-rev-collector":"revCollector", "gulp-asset-rev":"assetRev"}});

const prefix_css = (done) => {
    gulp.src("./css/*")
        .pipe($.rev()) //添加hash后缀
        .pipe(gulp.dest("./dist/css/")) //移动到dist/css
        .pipe($.rev.manifest()) //生成文件映射
        .pipe(gulp.dest("rev/css")) //将映射文件导出到rev/css中
    done()
}

const prefix_js = (done) => {
    gulp.src("./js/*.js")
        .pipe($.rev())
        .pipe(gulp.dest('./dist/js/'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('rev/js'));
    done()
}

const prefix_image = (done) => {
    gulp.src("./images/*.jpg")   //该任务针对的文件
      .pipe($.rev())  //该任务调用的模块
      .pipe(gulp.dest('dist/images/')) //编译后的路径
      .pipe($.rev.manifest())
      .pipe(gulp.dest('rev/images'));
    done()
}

const prefix_html = (done) => {
    gulp.src(["rev/**/*.json","./*.html"])
        .pipe($.revCollector())
        .pipe(gulp.dest('./'))
    done()
}

exports.default = gulp.series(prefix_css,  prefix_js, prefix_image, prefix_html)
```
### **15. gulp-zip 打包压缩指定目录下的指定文件到zip压缩包文件 **
```js
let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf", "gulp-rev-collector":"revCollector", "gulp-asset-rev":"assetRev"}});

const gzip = (done) => {
    gulp.src("./images/*")
        .pipe($.zip("images.zip")) // filename必须
        .pipe(gulp.dest("./dist/zip/"))
    done()
}


exports.default = gzip
```
### **16. gulp-task-listing 打印出gulpfile.js中定义的所有task **
这个插件的作用也很容易猜，它可以打印出gulpfile.js中定义的所有task，值得一提的是它还可以根据task的名字确定它是不是一个子task，比如带有:、-、_的task就被认为是子task。一般把这个插件作为默认的task来调用
```js
let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf", "gulp-rev-collector":"revCollector", "gulp-asset-rev":"assetRev"}});

const gzip = (done) => {
    gulp.src("./images/*")
        .pipe($.zip("images.zip"))
        .pipe(gulp.dest("./dist/zip/"))
    done()
}

const tasking = (done) => {
    $.taskListing() //gulp-task-listing
    done()
}

/*
    打印如下：

    [11:33:22] Using gulpfile C:\web\gulp\gulpfile.js
    [11:33:22] Starting 'default'...

    Main Tasks
    ------------------------------
        default

    [11:33:22] Finished 'default' after 53 ms

    该模块的功能类似于命令：gulp --tasks

    [11:32:57] Tasks for C:\web\gulp\gulpfile.js
    [11:32:57] └── default

 */


exports.default = tasking
```
### **17. yargs 处理命令行参数 **
严格的说，yargs不是专门用于gulp的，它是Node中处理命令行参数的通用解决方案。只要一句代码`var args = require('yargs').argv`;就可以让命令行的参数都放在变量args上，非常方便。它可以处理的参数类型也是多种多样的：
* 单字符的简单参数，如传入`-m=5`或`-m 5`，则可得到`args.m = 5`。
* 多字符参数（必须使用双连字符），如传入`--test=5`或`--test 5`，则可得到`args.test = 5`。
* 不带值的参数，如传入`--mock`，则会被认为是`布尔`类型的参数，可得到`args.mock = true`。
* 除此之外，还支持很多其他类型的传参方式，[具体可参考它的文档](https://www.npmjs.com/package/yargs)。
```js
let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf", "gulp-rev-collector":"revCollector", "gulp-asset-rev":"assetRev"}});
let args = require('yargs').argv


const tasking = (done) => {
    console.log(args)
    $.taskListing() //gulp-task-listing
    done()
}

/*
   
    命令行输入：C:\web\gulp>gulp --task=123 --test=24342 --str=asd --name=fgh

    打印如下：

    [[11:40:25] Using gulpfile C:\web\gulp\gulpfile.js
    [11:40:25] Starting 'default'...
    { _: [],
      task: 123,
      test: 24342,
      str: 'asd',
      name: 'fgh',
      '$0': 'C:\\Users\\92809\\AppData\\Roaming\\npm\\node_modules\\gulp\\bin\\gulp.js' }

    Main Tasks
    ------------------------------
        default

 */


exports.default = tasking
```