module.exports = {
  devServer:{
    port:9080, // 启动端口号
    open:false,  // 启动后是否自动打开网页
    historyApiFallback: true
  },
  assetsDir: 'static',
  parallel: false,
  publicPath: './'
}
