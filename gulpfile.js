
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
var runSequence = require('run-sequence');

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


//2. wiredep 
/*
    概述：wiredep就是wire dependence的意思，它的作用就是把bower.json中声明的dependence自动的包含到HTML中去。要插入文件，wiredep需要解决两个问题：

      插入什么文件：要插入的文件列表自然来自bower.json，每个bower安装的依赖库，根目录下边都有一个自己的bower.json文件，其中的main字段指明了使用这个库需要包含的文件，wiredep最终包含的文件列表就来自这个字段。有些情况下，库自身的bower.json的main字段可能会多包含文件或少包含文件，如果想要定制这个列表，则可以在自己的bower.json中使用overrides字段，如下面的代码覆盖了mdi这个库的main字段。

      wiredep插件支持很多参数，常用的主要有两个：bowerJson，directory

 */

const wiredep = require("wiredep").stream
const wiredeps = (done) => {
  return gulp.src(["./wiredep/index.html"]).pipe(wiredep({
    bowerJson: require("./bower.json"),
    directory: './bower_components/'
  })).pipe(gulp.dest("./dist/wiredep/"))
}

/*
    其他参数：
    optional: 'configuration',
    goes: 'here'
    
 */

/*
    打印效果如下：

    D:\me\gulp\gulp-test (master -> origin) (<no name>@1.0.0)
    λ gulp
    [14:42:17] Using gulpfile D:\me\gulp\gulp-test\gulpfile.js
    [14:42:17] Starting 'default'...
    [14:42:17] Finished 'default' after 263 ms
  
    实现效果如下;

    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>first project of angularJS and spring-boot</title>
          <!-- bower:css -->
          <link rel="stylesheet" href="../bower_components/angular-material/angular-material.css" />
          <link rel="stylesheet" href="../bower_components/codemirror/lib/codemirror.css" />
          <link rel="stylesheet" href="../bower_components/angular-loading-bar/build/loading-bar.css" />
          <link rel="stylesheet" href="../bower_components/angular-material-data-table/dist/md-data-table.css" />
          <link rel="stylesheet" href="../bower_components/angular-chart.js/dist/angular-chart.css" />
          <!-- endbower -->  
        </head>
        <body ng-app>

          <!-- bower:js -->
          <script src="../bower_components/angular/angular.js"></script>
          <script src="../bower_components/angular-resource/angular-resource.js"></script>
          <script src="../bower_components/angular-cookies/angular-cookies.js"></script>
          <script src="../bower_components/angular-messages/angular-messages.js"></script>
          <script src="../bower_components/angular-animate/angular-animate.js"></script>
          <script src="../bower_components/angular-sanitize/angular-sanitize.js"></script>
          <script src="../bower_components/angular-aria/angular-aria.js"></script>
          <script src="../bower_components/angular-route/angular-route.js"></script>
          <script src="../bower_components/angular-material/angular-material.js"></script>
          <script src="../bower_components/angular-ui-router/release/angular-ui-router.js"></script>
          <script src="../bower_components/angular-ui-validate/dist/validate.js"></script>
          <script src="../bower_components/codemirror/lib/codemirror.js"></script>
          <script src="../bower_components/angular-ui-codemirror/ui-codemirror.js"></script>
          <script src="../bower_components/angular-loading-bar/build/loading-bar.js"></script>
          <script src="../bower_components/angular-local-storage/dist/angular-local-storage.js"></script>
          <script src="../bower_components/angular-material-data-table/dist/md-data-table.js"></script>
          <script src="../bower_components/angular-once/once.js"></script>
          <script src="../bower_components/moment/moment.js"></script>
          <script src="../bower_components/angular-moment/angular-moment.js"></script>
          <script src="../bower_components/Chart.js/Chart.js"></script>
          <script src="../bower_components/angular-chart.js/dist/angular-chart.js"></script>
          <script src="../bower_components/angular-filter/dist/angular-filter.min.js"></script>
          <script src="../bower_components/ng-file-upload/ng-file-upload.js"></script>
          <script src="../bower_components/jquery/dist/jquery.js"></script>
          <!-- endbower --> 
        </body>
      </html>

 */

exports.default = gulp.series(clear, merges)