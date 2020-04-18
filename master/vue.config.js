/*
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:41:28
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-18 16:33:37
 */
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store': '@/store',
        'container': '@/container'
      }
    }
  },
  publicPath: './',
  css: {
    loaderOptions: {
      stylus: {
        // 全局使用stylus变量
        import: '~@/assets/css/base/var.styl'
      }
    }
  },
  // publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
  // /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  // outputDir: 'dist',
  // /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  // assetsDir: "assets",
  // /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  // productionSourceMap: false,
  // /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  // filenameHashing: false,
  // /* 代码保存时进行eslint检测 */
  // lintOnSave: true,
  // /* webpack-dev-server 相关配置 */
  // devServer: {
  //   /* 自动打开浏览器 */
  //   open: true,
  //   /* 设置为0.0.0.0则所有的地址均能访问 */
  //   host: '0.0.0.0',
  //   port: 8081,
  //   https: false,
  //   hotOnly: false,
  // /* 使用代理 */
  // proxy: {
  //     '/api': {
  //         /* 目标代理服务器地址 */
  //         target: 'http://47.100.47.3/',
  //         /* 允许跨域 */
  //         changeOrigin: true,
  //     },
  // },
  // },
}