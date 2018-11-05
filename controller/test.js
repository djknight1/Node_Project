const login = require('../service/CommonService')
let fn_test = async () => {
  try {
    let USER_ID = '1160299002';
    await login(USER_ID);
  } catch (e) {
    console.log(e)
  }
}
module.exports = {
  'GET /test': fn_test,
};
