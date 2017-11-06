/**
 * Created by Center on 2017/4/1.
 */
let Cet = require("cet");
let routes = require("./routes/business");
let app = new Cet();
const checkData = require("./utils/checkData");
var config = require('./config');
// const CMD = require('./middlewares/apiCmd');
const Mongo = require("./utils/mongodbHelper");
const mongo = new Mongo({
	host: 'localhost',
	port: 27017,
	user: 'data',
	pass: 'root2017',
	db: 'smartHome',
	max: 100,
	min: 1,
});

// 数据完整性分析
app.use(checkData());
// routes
// 格式化输出
// app.use(response_formatter);
app.use(mongo.use());
// 业务处理
app.use(routes.route());
// others
app.use(async function (ctx,next) {
	console.log("not found!");
});
//
app.createServer(config.netPort);

var Control = require('./routes/control');
new Control(app);
