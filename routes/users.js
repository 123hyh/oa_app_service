var router = require("koa-router")();
var { setToken, celarUserToken } = require("../util/token");
router.prefix("/staff");

router.get("/", function*(next) {
  this.body = "this is a users response!";
});

router.get("/bar", function*(next) {
  this.body = "this is a users/bar response!";
});
router.post("/login", async function(next) {
  // 设置响应头
  setToken(this.response.set.bind(this), token => {
    this.response.body = { data: token };
  });
});
router.get("/logout", function() {
  celarUserToken(() => {
    this.body = { message: "退出登录成功···" };
  });
});

module.exports = router;
