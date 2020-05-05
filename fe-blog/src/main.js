import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./routes/index.js"
import App from './App.vue'
import { get, post } from './service/service'
import store from './store/index'
 

Vue.use(ElementUI);


Vue.config.productionTip = false

Vue.prototype.$get = get;
Vue.prototype.$post = post;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')