const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

/**
 * 判断当前的URL是否以指定前缀开头，来决定是否发送文件内容
 * @param url 静态文件所在url前缀
 * @param dir 静态文件目录
 * @returns {function(*, *)}
 */
function staticFiles(url, dir) {
    return async (ctx, next) => {
        //获取请求的静态文件路径
        let rpath = ctx.request.path;
        //判断当前的URL是否以指定前缀开头
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length));
            //判断文件是否存在
            if (await fs.exists(fp)) {
                //设置返回的类型；
                ctx.response.type = mime.getType(rpath);
                //返回的结果是查看文件
                ctx.response.body = await fs.readFile(fp);
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;
