// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import interceptor from '../static/interceptor'
import store from './store/index'
import Router from 'vue-router'
import echarts from 'echarts'
const routerPush = Router.prototype.push
import Viewer from 'v-viewer'
import ZswUi from './ui'
Vue.use(ZswUi)
//百度富文本编辑器

Vue.use(Viewer)





Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.prototype.$echarts = echarts

Vue.use(ElementUI)


Vue.prototype.$http = axios

String.prototype.startWith=function(str){
  let reg=new RegExp("^"+str);
  return reg.test(this);
}
//测试ok，直接使用str.endWith("abc")方式调用即可
String.prototype.endWith=function(str){
  let reg=new RegExp(str+"$");
  return reg.test(this);
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
