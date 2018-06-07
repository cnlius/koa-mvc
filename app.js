const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

const app = new Koa();

// 判断是否是生产环境
const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log('----------------start----------------');
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
    console.log('----------------end----------------');
});

// 生产环境下静态文件由nginx处理，所以开发环境下才加载静态文件（如样式等）；
if (! isProduction) {
    //加载静态文件
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// request解析body
app.use(bodyParser());

// nunjucks模板引擎
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// api请求处理
app.use(controller());

app.listen(3000);
console.log('server on http://localhost:3000/');
