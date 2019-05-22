
/*
		 常用插件地址：
            http://pinkyjie.com/2015/08/02/commonly-used-gulp-plugins-part-1/#more 进击的马斯特 github博客

        常用文档地址：
            http://i5ting.github.io/stuq-gulp/#10609
 */

let gulp = require("gulp");
let gulpLoadPlugins = require('gulp-load-plugins');
let $ = gulpLoadPlugins({lazyload: true, rename:{"gulp-ruby-sass" : "sass", "gulp-markdown-pdf": "mdpdf", "gulp-rev-collector":"revCollector", "gulp-asset-rev":"assetRev"}});
let del = require("del")


// gulp-filter 根据规则（minimatch），筛选出需要的文件流单独最后处理，筛选时坑有点多，建议使用gulp-print以及gulp-util工具开发，以及需要注意工作流的先后同步问题
// gulp-filter文档：https://www.npmjs.com/package/gulp-filter
// 规则文档：https://github.com/isaacs/minimatch#options


const clear = (done) => {
  del.sync(['./dist/newjs/**',"!./dist/newjs"])
  done()
}

/*
gulp.task("clear", () => {
  return gulp.src("./dist/newjs/*")
      .pipe($.clean())
})*/

/*const clear = (done) => {
  return gulp.src("./dist/newjs/*")
      .pipe($.clean())
}*/

const filters = (done) => {

  let filter = $.filter(["./js/*.js"],{restore: true})
  // console.log(filter)
  gulp.src(["./**/*.js","!**/node_modules/**","!./dist/**","!**/gulpfile.js","!./class/*"])
    .pipe($.print.default(func))
    .pipe(filter)
    .pipe($.concat("all.min.js"))
    // .pipe($.uglify())
    .pipe(filter.restore)
    .pipe($.print.default(func))
    .on('error', function(err) {
        $.util.log($.util.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest("./dist/newjs/"))
  done()
}

function func(data){
  console.log("当前的文件路径："+data)
}


// 2. gulp-flatten 的使用，常用于把各个子目录下面的所有满足匹配规则的文件（比如所有js文件）取出来放在同级文件夹下面
// 文档地址：https://www.npmjs.com/package/gulp-flatten

const flattens = (done) => {
    gulp.src(["**/**/*.js","!**/node_modules/**","!./dist/newjs/**"])
		.pipe($.print.default(func))
		.pipe($.flatten())
		.pipe(gulp.dest("./dist/newjs/"))
	done()
}


//3. gulp-if 的使用 ，类似于三元运算符， 如果为true则执行当前管道的操作 （可以执行多个操作），如果false则不再执行当前管道
//文档地址：https://www.npmjs.com/package/gulp-if

const guif = (done) => {
    gulp.src(["**/**/*.js","!**/node_modules/**","!./dist/newjs/**"])
    .pipe($.print.default(func))
    .pipe($.if(false, $.flatten()))
    .pipe(gulp.dest("./dist/newjs/"))
  done()
}

exports.default = gulp.series(clear, guif)


