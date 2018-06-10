/**
 * 自动化读取models文件夹内的所有model，也可以不用，直接导入单个模块也很方便；
 * @author liusong
 * @date 2018/6/10
 */
const fs = require('fs');

//读models文件夹
let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
});

module.exports = {};

for (let f of js_files) {
    console.log(`import model from file ${f}`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
}
