const CracoAntDesignPlugin = require('craco-antd');
const path = require('path');
const os = require('os');
const { name } = require('./package');

let needHost = ''; // 打开的host

try {
  const network = os.networkInterfaces(); // 获得网络接口列表。
  needHost = network[Object.keys(network)[0]][1].address; // 本机ip
  needHost = needHost.includes('::') ? 'localhost' : needHost;
} catch (e) {
  needHost = 'localhost';
}

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  devServer: {
    // host: needHost,
    // open: true,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    hot: true,
    watchContentBase: false,
    liveReload: false
    // 如果启用代理，axios 的baseUrl 按需改动
    // proxy: {
    // 	// 这个key是匹配路由地址的前缀，即如果baseUrl为空字符串或/的话，在实现api时，必须在前面加上/lebron
    // 	// 如果baseUrl 有路由地址(不是域名或ip) 值需要与这个key相同
    // 	'/api': {
    // 		target: 'http://localhost:7001', // 需要跨域的服务地址
    // 		changeOrigin: true, // 是否允许跨域
    // 		pathRewrite: {
    // 			// 将指定的前缀替换掉，变成真实的接口地址，如：target + 真实地址
    // 			// 如果像以下方式，说明真实接口地址是存在/api前缀的
    // 			// '^/api': '/' 说明api这个前缀在真实接口地址中不存在
    // 			'^/api': '/api'
    // 		}
    // 	}
    // }
    // https: false,
    // disableHostCheck: true
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.library = `${name}-[name]`;
      webpackConfig.output.libraryTarget = 'umd';
      webpackConfig.output.jsonpFunction = `webpackJsonp_${name}`;
      webpackConfig.output.globalObject = 'window';

      return webpackConfig;
    },
    alias: {
      '@': pathResolve('src'),
      '@assets': pathResolve('src/assets'),
      '@common': pathResolve('src/common'),
      '@components': pathResolve('src/components'),
      '@hooks': pathResolve('src/hooks'),
      '@pages': pathResolve('src/pages'),
      '@store': pathResolve('src/store'),
      '@utils': pathResolve('src/utils')
    }
  },
  babel: {
    plugins: [
      // 下面预设基于craco-antd已内置好，如果自定义配置请安装craco-less, 以及babel-plugin-import进行按需加载, 目前antd已默认支持按需加载
      // ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@ant-prefix': 'coho'
        }
      }
    }
  ]
};
