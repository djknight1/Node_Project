module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unexpected-multiline": 2,
    // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    "no-unreachable": 2,
    "no-extra-parens": 1,
    "no-undefined": 2,
    "lines-around-comment": [1,{"beforeBlockComment":true}],
    "eqeqeq": [2, "allow-null"],
    "array-bracket-spacing": [2, "never"],
    // 禁止不必要的分号
    "no-extra-semi": 2,
    // 要求操作符周围有空格
    "space-infix-ops": 2
  },
  parserOptions: {
    "ecmaVersion": 2017
  }
}
