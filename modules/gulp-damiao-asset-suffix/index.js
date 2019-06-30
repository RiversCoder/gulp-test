var through = require("through2")

function addSuffix(file_content_txt){
    var re1 = /\s*src\s*=(\s*[\"\']{1}\s*)([^>]*)(\s*[^>]*[\"\']{1})/ig
    var re2 = /\s*href\s*=(\s*[\"\']{1}\s*)([^>]*)(\s*[^>]*[\"\']{1})/ig

    var str1 = file_content_txt.replace(re1, ($0, $1, $2, $3) => {
        return ' '+$0.replace(/\s*/g, '').slice(0,-1)+'?version='+Math.floor(Math.random()*100000000000)+$1.replace(/\s*/g,'')+' '
    })

    var str2 = str1.replace(re2, ($0, $1, $2, $3) => {
        return ' '+$0.replace(/\s*/g, '').slice(0,-1)+'?version='+Math.floor(Math.random()*100000000000)+$1.replace(/\s*/g,'')+' '
    })

    return str2
}

module.exports = function(suffix){
/*    if(!suffix){
        suffix = "";
    }

    var suffix = new Buffer(suffix);*/

    var stream = through.obj(function(file, encoding, callback){
        
        // 如果file类型不是buffer 退出不做处理
        if(!file.isBuffer()){
            return callback();
        }
		  
        // 获取文件中的内容 添加随机后缀
		file_content_txt = file.contents.toString('utf-8')
		
        // 将字符串加到文件数据末尾
        file.contents = Buffer.from(addSuffix(file_content_txt), 'utf-8')
        // file.contents = Buffer.concat([file.contents, suffix]);

        // 确保文件会传给下一个插件
        this.push(file);

        // 告诉stream引擎，已经处理完成
        callback();
        
    });
    
    return stream;
}