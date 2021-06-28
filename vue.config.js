// // // vue.config.js
// module.exports = {
//     // 选项...
//     // title:'同心台'
//     productionSourceMap:false,
//     publicPath:"/dx/",
//     // assetsDir:"dx",//资源路径
//     devServer: {
//       proxy: {
//         '/api': {
//           target: 'http://test.tongxintailm.com',
//           // target:'http://192.168.101.4/tongxintailmtongxintailm/public/index.php',
//           changeOrigin: true
//         }
//       }
//       // proxy: 'http://test.tongxintailm.com/api/1/'
//     }
//   }








// vue.config.js
module.exports = {
  // 选项...
  // title:'同心台'
  productionSourceMap:false,
  publicPath:"/dx/",
  devServer: {
    // https: true,
    proxy: {
      '/apis': {
        target: 'http://test.tongxintailm.com/api',
        // target: 'http://shopping.tongxintailm.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''//需要rewrite重写的
        }
      }
    }
  },
  //去除console.log
	// configureWebpack: config => {
	// 	if (process.env.NODE_ENV === 'production') {
	// 		config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
	// 	}
	// }
}