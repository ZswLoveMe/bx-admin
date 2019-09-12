const files = require.context('.', true, /\.js$/)

console.log(files.keys()) // ["./home.js"] 返回一个数组

let configRouters = []

files.keys().forEach(key => {
  if (key === './index.js') return
  configRouters = configRouters.concat(files(key).default) // 读取出文件中的default模块
})
console.log('configRouters：', configRouters)
export default configRouters
