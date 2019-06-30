
/*
		 常用插件地址：
            http://pinkyjie.com/2015/08/02/commonly-used-gulp-plugins-part-1/#more 进击的马斯特 github博客

        常用文档地址：
            http://i5ting.github.io/stuq-gulp/#10609
 */

let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf", "gulp-rev-collector":"revCollector", "gulp-asset-rev":"assetRev"}});
let merge = require('merge-stream');
let del = require('del')
let suffix = require('./modules/gulp-damiao-asset-suffix/index.js')

var htmlreplace = require("gulp-html-replace")

const clear = (done) => {
  del.sync(['./dist/html/*','!./dist/newjs','./dist/newcss/*','./dist/newcss'])
  done()
}

const suffixs = (done) =>{
  gulp.src(['./html/home.html'])
    .pipe(suffix())
    .pipe(gulp.dest('./dist/html/'))
  done()
}

exports.default = gulp.series(clear, suffixs)