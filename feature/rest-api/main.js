const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('../../controller');
const rest = require('../../rest');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log('----------------start----------------');
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
    console.log('----------------end----------------');
});

// request解析body
app.use(bodyParser());

// 绑定ctx.rest()方法
app.use(rest.restify());

// api请求处理
app.use(controller());


app.listen(3000);
console.log('server on http://localhost:3000/');
