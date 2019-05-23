
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

// 1. merge-stream 
/*
  一个gulp的task只能返回一个stream，但有的时候有这么一种情景：有两类文件，它们的原始位置和处理后的位置都是不同的，但它们的处理流程相同。由于gulp.src和gulp.dest的参数不同，我们就需要写两个task来分别完成这个任务，一方面略显重复，另一方面逻辑上来讲这两个task本来就是处理同样的事情的。这种情况就需要merge-stream登场了，它的作用就是将多个stream合成一个返回。比如下面这个例子
 
 // 批量给js文件和css添加注释

 */

const clear = (done) => {
  del.sync(['./dist/newjs/*','!./dist/newjs','./dist/newcss/*','./dist/newcss'])
  done()
}

const merges = (done) => {
  var stream1 = addHeaderText("./js/*.js", "./dist/newjs/");  // 千万不要写成 ./dist/newjs/* 这种
  var stream2 = addHeaderText("./css/*.css", "./dist/newcss/"); // 
  return merge(stream1, stream2);
}

var pkg = require('./package.json');
var template = ['/**',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @authors <%= pkg.authors %>',
      ' * @version v<%= pkg.version %>',
      ' * @link <%= pkg.homepage %>',
      ' * @license <%= pkg.license %>',
      ' */',
      ''
  ].join('\n');

// 添加注释
function addHeaderText(src, dest){
    return gulp.src(src).pipe($.header(template, { pkg: pkg })). pipe(gulp.dest(dest))
}

/*
    打印：

    D:\me\gulp\gulp-test (master -> origin) (<no name>@1.0.0)
    λ gulp
    [19:59:23] Using gulpfile D:\me\gulp\gulp-test\gulpfile.js
    [19:59:23] Starting 'default'...
    [19:59:23] Starting 'clear'...
    [19:59:23] Finished 'clear' after 50 ms
    [19:59:23] Starting 'merges'...
    [19:59:23] Finished 'merges' after 193 ms
    [19:59:23] Finished 'default' after 251 ms

 */

var runSequence = require('run-sequence');

gulp.task("task1", function(done){
  console.log("task1")
  done()
})

gulp.task("my-taskss", function(done){
    runSequence( ["task1"])
    done()
})



// exports.default = runSequence


