
/*
		 常用插件地址：

		 	http://pinkyjie.com/2015/08/02/commonly-used-gulp-plugins-part-1/

 */

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


//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src("./js/*.js")
        .pipe($.rev())
        .pipe(gulp.dest('./dist/js/'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('rev/js'));
})

gulp.task('assetRev', function(){
    return gulp.src("./*.html")   //该任务针对的文件
      .pipe($.assetRev())  //该任务调用的模块
      .pipe(gulp.dest('dist/images/')) //编译后的路径
});

const prefix_html = (done) => {
    gulp.src(["rev/**/*.json","./*.html"])
        .pipe($.revCollector())
        .pipe(gulp.dest('./'))
    done()
}

exports.default = gulp.series(prefix_css,  "revJs", "assetRev", prefix_html)



