/**
 * 模板引擎nunjucks封装，目的是给异步函数的ctx添加render方法，来调用模板引擎渲染视图
 */
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    let
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

/**
 * ctx添加render方法，调用时会调用nunjucks模板引擎渲染模板
 * @param path
 * @param opts
 * @returns {function(*, *)}
 */
function templating(path, opts) {
    let env = createEnv(path, opts);
    return async (ctx, next) => {
        ctx.render = function (view, model) {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        };
        await next();
    };
}

module.exports = templating;
