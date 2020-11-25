module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'https://service-8l9rduf6-1252171952.hk.apigw.tencentcs.com/release/res_Token',
        ws: true,
        secure: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/video': {
        target: 'https://service-8l9rduf6-1252171952.hk.apigw.tencentcs.com/release/res_Token',
        ws: true,
        secure: true,
        changOrigin: true,
        pathRewrite: {
          '^/video': ''
        }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
