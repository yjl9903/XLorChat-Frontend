import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueChatScroll from "vue-chat-scroll";
import Buefy from "buefy";

Vue.use(Buefy);
Vue.use(VueChatScroll);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
