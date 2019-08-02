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
}
