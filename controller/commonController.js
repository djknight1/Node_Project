/* 这个controller作用:登录判断，返回用户权限, 文件下载, 文件上传 */
const commonService = require('../service/CommonService');
const result = require('../common/resultBean');
const secret = require('../config/config').secret;
const jwt = require('jsonwebtoken');
const roleType = {
  teacher: 'teacher',
  student: 'student'
};
let fn_login = async (ctx) => {
  let id = ctx.request.body.userId,
    password = ctx.request.body.password;
  console.log(id, password);
  let status = await commonService.login(id, password);
  console.log(status)
  if (status.exist === 1) {

    let token = setToken(id, status.msg)
    ctx.body = result.sendSuccess('登录成功！', { token })

  } else {
    ctx.body = result.sendFail('登录失败！' )
  }
};

// 用于设置token和返回值
function setToken (id, role) {
  const payload = {
    id,
    role
  }
  // secret是全局密钥 一定要保存好
  const token = jwt.sign(payload, secret, {
    expiresIn: Math.floor(Date.now() / 1000) + 3 * 60 * 60 // 三个小时
  });

  return token;
}

module.exports = {
  'POST /login': fn_login,
};
