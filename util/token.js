let token = "";
module.exports.setToken = function setToken(setCb, handleCb) {
  const data = Math.floor(Math.random() * 100000);
  token = data;
  handleCb({token: token, 'user_token': Math.random()})
};
/**
 * 校验token
 */
module.exports.checkToken = function(cb) {
  // 需要绑定当前上下文调用
  console.log(this.request.header)
  const data  = +this.request.header.authorization
  if (data === token) {
    return cb();
  } else {
    this.status = 403;
    this.body = { error: "无权限访问" };
  }
};  
/**
 * 清除用户token
 */
module.exports.celarUserToken = cb => {
  token = "";
  cb();
};
