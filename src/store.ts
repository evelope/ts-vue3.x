import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_info: {
      info_user: {},
      info_user_wechat: {},
    },
  },
  mutations: {
    save_user_info(state, data) {
      state.user_info = data;
    },
  },
  actions: {

  },
});
