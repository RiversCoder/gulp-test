
/*
		 常用插件地址：
            http://pinkyjie.com/2015/08/02/commonly-used-gulp-plugins-part-1/#more 进击的马斯特 github博客

        常用文档地址：
            http://i5ting.github.io/stuq-gulp/#10609
 */

let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf", "gulp-rev-collector":"revCollector", "gulp-asset-rev":"assetRev"}});


const filters = (done) => {

  let filter = $.filter(["!./js/*.js"],{restore: true})
  gulp.src(["./**/*.js","!./node_modules/**"])
    .pipe($.clean("./dist/newjs/"))
    .pipe(filter)
    .pipe($.uglify())
    .on('error', function(err) {
        $.util.log($.util.colors.red('[Error]'), err.toString());
    })
    .pipe(filter.restore)
    .pipe(gulp.dest("./dist/newjs/"))
  done()
}

exports.default = filters


