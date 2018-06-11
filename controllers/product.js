// 存储Product列表，相当于模拟数据库:
let products = [{
    name: 'iPhone',
    price: 6999
}, {
    name: 'Kindle',
    price: 999
}];


module.exports = {
    // localhost:3000/api/products
    'GET /api/products': async (ctx, next) => {
        // 设置Content-Type:
        ctx.response.type = 'application/json';
        // 设置Response Body:
        // json object
        // ctx.response.body = {
        //     products: products
        // };

        // json array
        ctx.response.body = products;
    },
    // url：localhost:3000/api/products
    // Content-Type：application/json
    // params-style-body: {"name":"XBox","price":3999}
    'POST /api/products': async (ctx, next) => {
        let p = {
            name: ctx.request.body.name,
            price: ctx.request.body.price
        };
        products.push(p);
        ctx.response.type = 'application/json';
        ctx.response.body = p;
    }
};