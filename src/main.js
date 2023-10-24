import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import HighchartsVue from 'highcharts-vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(HighchartsVue);

new Vue({
  render: h => h(App),
  
}).$mount('#app')
