const User  = require('../model/User')
const getJson  = require('../util/getModelJson')
let login = async (id, password) => {
  try {
    let user = await User.selectUserById(id);
    if (!user) {
      return {
        exist: 0,
        msg: '用户不存在！'
      };
    }
    user = getJson(user);
    if (!password === user.USER_PWD) {
      return {
        exist: 0,
        msg: '用户名或密码错误！'
      };
    }
    // 返回user.ROLE为登录时做判断
    return {
      exist: 1,
      msg: user.ROLE
    };
  } catch (e) {
    console.log(e.toString())
  }
};

let info = async (id) => {
  try {
    let user = await User.selectUserById(id);
    // 返回user.ROLE为登录时做判断
    return user.ROLE;
  } catch (e) {
    console.log(e.toString())
  }
}

module.exports = {
  login,
  info
};
