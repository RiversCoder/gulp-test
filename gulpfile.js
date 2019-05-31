
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

var htmlreplace = require("gulp-html-replace")

const clear = (done) => {
  del.sync(['./dist/newjs/*','!./dist/newjs','./dist/newcss/*','./dist/newcss'])
  done()
}

const hr = (done) => {
  gulp.src(["./html/main.html"])
    .pipe(htmlreplace({
      js:{
        src:[ ["./js/add.js","./js/add.js"] ], 
        tpl: '<script data-main="%s" src="%s"></script>'  // 将数组编译到模板字符串中
      },
      nulljs:{
        src:null,
        tpl: '<script data-main="nulljs" src="%f.js"></script>'  // 将数组编译到模板字符串中
      },
      dirjs:{
        src:'dirpath',
        tpl: '<script data-main="nulljs" src="%s/%f.js"></script>'  // 把字符串%s（这里是 dirpath）以及 文件名%f（这里是main）编译到到模板字符串中
      },
      css:{
        src:[ ["css/style.js","css/style1.js","css/style2.js"], ],
        tpl: '<link ref="stylesheet" type="text/css" href="%s" />\n<link ref="stylesheet" type="text/css" href="%s" />\n<link ref="stylesheet" type="text/css" href="%s" />\n' // 编译多个css link字符串
      },
      image:{
        src:[["images/01.jpg", "images/02.jpg"]],  // 静态资源个人建议使用Stream类型 让其自动遍历
        tpl: `<image src="%s?v=${Math.random()}" />\n<image src="%s?v=${Math.random()}" />`   // 编译多个img 图片字符串 带随机版本号，类似于hash
      },
      sassTocss:{
        src: $.sass("./scss/*.scss"), // 编译多sass文件成css 把编译后的css内容植入页面的style标签中
        tpl: '<style>%s</style>'
      }
    },{
    keepUnassigned: false,
    keepBlockTags: false,
    resolvePaths: false
  }))
    .pipe(gulp.dest('./dist/newjs/')) // 输出到 dist/newjs/ 目录文件夹下

  done()
}

exports.default = gulp.series(clear, hr)