const SUCCESS = 1;
const FAIL = 0;

function sendSuccess(msg, result = {}) {
  return {
    code: SUCCESS,
    msg,
    result
  }
}

function sendFail(msg, result = {}) {
  return {
    code: FAIL,
    msg,
    result
  }
}
module.exports = {
  sendFail,
  sendSuccess
}
