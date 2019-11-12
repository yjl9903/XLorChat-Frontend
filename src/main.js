import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueChatScroll from 'vue-chat-scroll';
import Buefy from 'buefy';

Vue.use(Buefy);
Vue.use(VueChatScroll);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
