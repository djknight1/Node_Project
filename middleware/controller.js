const fs = require('fs')

// __dirname 指向当前目录 比如你在a/b/c/test.js中写了__dirname 那么__dirname就等于a/b/c
function addController(router, dir) {
// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
  console.log(dir)
  let files = fs.readdirSync(dir);

// 找到所有的js文件
  let js_files = files.filter((file) => {
    return file.endsWith('.js')
  })
  for (let f of js_files) {
    console.log(`process controller: ${f}...`);
    // 导入js文件:
    let mapping = require('../controller/' + f);
    addMapping(router, mapping);
  }
}

function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      // 如果url类似"GET xxx":
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      // 如果url类似"POST xxx":
      let path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(mapping[url])
      console.log(`register URL mapping: POST ${path}`);
    } else {
      // 无效的URL:
      console.log(`invalid URL: ${url}`);
    }
  }
}

module.exports = function (dir) {
  let
    controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
    router = require('koa-router')();
  addController(router, controllers_dir);
  // 注册完所有url 返回routes
  return router.routes();
}
