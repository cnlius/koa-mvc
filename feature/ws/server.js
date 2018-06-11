// 导入WebSocket模块:
const WebSocket = require('ws');
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    await next();
});

let server = app.listen(3000);

// 引用Server类:
const WebSocketServer = WebSocket.Server;
// 实例化:
const wss = new WebSocketServer({
    server: server
});


wss.on('connection', function (ws) {
    console.log(`[SERVER] connection...`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send('hello i has received your message', (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    })
});

console.log('server on http://localhost:3000/');