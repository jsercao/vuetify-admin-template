// const ProxyAgent = require('proxy-agent')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    sourceMap: true
  },
  productionSourceMap: false,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       // agent: new ProxyAgent('socks5://127.0.0.1:1086'),
  //       target: 'http://your-back-end-api-url',
  //       changeOrigin: true,
  //       ws: false
  //     }
  //   }
  // }
}
