const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api1', {    //遇见/api1前缀的请求，就会触发该代理配置
      target: 'http://localhost:5000',    //请求转发给谁
      changeOrigin: true,   // 控制浏览器收到的响应头中Host的值，与服务器端口号一致
      pathRewrite: { '^/api1': '' }   //重写请求路径
    })
  )
}