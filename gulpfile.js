
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


// 打印出多条信息 并且 可以给打印出来的信息着色
// 文档：https://www.npmjs.com/package/gulp-util （已经弃用未更新，但使用量依旧很大）
const log = (done) => {
    console.log(("123","哈哈哈","578","66666")) // 只打印出最后一个
    $.util.log("123","哈哈哈","578","66666") // gulp-util 出多个 空格隔开
    $.util.log($.util.colors.blue('123',009,"hello world"));
    /*
          可供选择的颜色： $.util.colors.blue
            red 、green、yellow、blue 、magenta（紫红色）、cyan、white
            gray ("bright black")、redBright、greenBright、yellowBright、blueBright、
            magentaBright、cyanBright、whiteBright
     */
    /*
        打印如下：

        C:\web\gulp>gulp
          [20:39:29] Using gulpfile C:\web\gulp\gulpfile.js
          [20:39:29] Starting 'default'...
          66666
          [20:39:29] 123 哈哈哈 578 66666
          [20:39:29] 123 9 hello world
          [20:39:29] Finished 'default' after 202 ms

     */
    done()
}


// 删除指定文件夹或者文件 类似于gulp-clean
// 文档：https://www.npmjs.com/package/del
const dels = (done) => {
  (async (done) => {
    const deletedPaths = await del(['./dest/html/*'], {dryRun: true});
    console.log('Files and folders that would be deleted:\n', deletedPaths.join('\n'));
    done()
  })(done);
  /*
      打印如下：

      C:\web\gulp (master -> origin)
      λ gulp
      [20:47:01] Using gulpfile C:\web\gulp\gulpfile.js
      [20:47:01] Starting 'default'...
      Files and folders that would be deleted:
       C:\web\gulp\dest\html\index.html
      [20:47:01] Finished 'default' after 24 ms

   */
}

// 计算文件的大小 通常与压缩类工具放在一起实用
// https://www.npmjs.com/package/gulp-bytediff
const bytediff = (done) => {
  gulp.src("./images/*.jpg")
    .pipe($.bytediff.start())
    .pipe($.imagemin())
    .pipe($.bytediff.stop(func_stop))
    .pipe(gulp.dest("./dist/images/"))
  done()
}

function func_stop(data){
  console.log(data)
}

// 打印结果：
/*
  C:\web\gulp (master -> origin)
  λ gulp
  [21:00:28] Using gulpfile C:\web\gulp\gulpfile.js
  [21:00:28] Starting 'default'...
  [21:00:29] Finished 'default' after 466 ms
  { fileName: '01.jpg',
    startSize: 140991,
    endSize: 139289,
    savings: 1702,
    percent: 0.9879283074806193 }
  [21:00:30] undefined
  { fileName: '02.jpg',
    startSize: 339094,
    endSize: 342126,
    savings: -3032,
    percent: 1.008941473455738 }
  [21:00:30] undefined
  [21:00:30] gulp-imagemin: Minified 1 image (saved 1.7 kB - 1.2%)

 */

exports.default = bytediff