const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const category = require(__dirname + '/model/User.js')
const app = new Koa();
app.use(bodyParser());

const controller = require('./middleware/controller');
// controller是一个函数
app.use(controller(__dirname + '/controller'));
app.listen(3000);



