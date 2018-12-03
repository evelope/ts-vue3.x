import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/js/flexible.js';
import { GetRequest } from './assets/js/utils';
import 'weui';
import './assets/less-css/initialize.css';
import './assets/less-css/base.css';
import './assets/icon/iconfont/iconfont.css';

// 引入校验工具
import './assets/js/validate.js';

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

// 全局组件
import GlobalComponents from './components/GlobalComponents';
Vue.config.productionTip = false;
Vue.use(GlobalComponents);


Vue.use(MintUI);
// console.log(MintUI,"ButtonButtonButton");

// 微信sdk配置
const wx: any = (window as any).wx;
GetRequest().then((data: object) => {
  wx.config({
    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    ...data,
    jsApiList: ['closeWindow', 'scanQRCode', 'updateAppMessageShareData', 'onMenuShareAppMessage'], // 必填，需要使用的JS接口列表
  });
});
export default new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');
