// sign in: 处理登录校验请求

module.exports = {
    'POST /login': async (ctx, next) => {
        let
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';
        if (email === 'admin@example.com' && password === '123456') {
            console.log('login ok!');
            ctx.render('login-ok.html', {
                title: 'Sign In OK',
                name: 'Mr Node'
            });
        } else {
            console.log('login failed!');
            ctx.render('login-failed.html', {
                title: 'Sign In Failed'
            });
        }
    }
};
