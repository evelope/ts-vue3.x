const proxyUrl = 'http://172.16.15.240';
const proxyPort = ':9018/';
// const proxyUrl = 'http://172.16.15.252';
// const proxyPort = ':11199/'
//240 对应 :9017    252  对应 :11199

module.exports = {
    outputDir: '../buildpublic/examples/static-files-and-index-rewrite/assets',
    devServer: {
        // 设置代理
        proxy: {
            '/wechat': {
                target: proxyUrl + proxyPort,
                changeOrigin: true,
                // pathRewrite: {
                //     '^/wechat': ''
                // }
            },
            '/api': {
                target: proxyUrl + proxyPort,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'fe'
                }
            },
            '/statistic': {
                target: proxyUrl + proxyPort,
                changeOrigin: true,
                pathRewrite: {
                    '^/statistic/statistic': '/statistic'
                }
            },
            '/send': {
                target: proxyUrl + ':9903',
                changeOrigin: true,
                pathRewrite: {
                    '^/send': ''
                }
            },
            '/scan': {
                target: 'http://wx.fubangyun.cn/',
                changeOrigin: true,
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.js',
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',
            }
        }
    },
}