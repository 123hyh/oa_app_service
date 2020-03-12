var app = require("koa")(),
  logger = require("koa-logger"),
  json = require("koa-json"),
  views = require("koa-views"),
  onerror = require("koa-onerror");

var index = require("./routes/index");
var users = require("./routes/users");
var audit = require("./routes/audit");
// error handler
onerror(app);

// global middlewares
app.use(
  views("views", {
    root: __dirname + "/views",
    default: "jade"
  })
);
app.use(require("koa-bodyparser")());
app.use(json());
app.use(logger());

app.use(function*(next) {
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log("%s %s - %s", this.method, this.url, ms);
});

app.use(require("koa-static")(__dirname + "/public"));

// routes definition
const routes = [index, users, audit];
for (let item of routes) {
  app.use(item.routes(), index.allowedMethods());
}
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
