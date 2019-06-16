const koa = require('koa');
const app = new koa();
const MiddleWare = require('./middleware');
const Router = require('./router')
// const views = require('koa-views');

// 中间件初始化
MiddleWare(app);

// token总路由验证
app.use(async (ctx, next) => {
    let params =Object.assign({}, ctx.request.query, ctx.request.body);
    ctx.request.header = {'authorization': "Bearer " + (params.token || '')}
    await next();
})

//业务路由初始化
Router(app);


app.listen(3000, () => {
    console.log('server is running at port 3000');
})