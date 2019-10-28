// import Vue from 'vue'
// import Router from 'vue-router'

import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterConfig from './modules' // 引入业务逻辑模块
import CommonRouters from './common' // 引入通用模块
import store from '../store'
import History from '../utils/history';
Vue.use(VueRouter)
Vue.use(History)
VueRouter.prototype.goBack =  function(){
  this.isBack = true
}


console.log('RouterConfig.concat(CommonRouters)：', RouterConfig.concat(CommonRouters))
let router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: RouterConfig.concat(CommonRouters)
})


router.beforeEach((to,from,next) => {
  if (to.meta.auth) { // 查看路由是否需要登录
    // 需要认证，则检查令牌
    console.log('store.state.token：', store.state.token)
    if (store.state.token) { // 已登录
      next();
    } else {// 去登陆
      next({
        path: '/login',
        query: {redirect: to.path}
      })
    }
  } else {
    next();
  }
})


// afterEach记录历史记录
router.afterEach((to, from) => {
  let params = {name:to.name,label:to.params.label}
  if (router.isBack) {
    // 后退
    History.pop(params);
    router.isBack = false;
  } else {
    console.log(params)
    if(params.name != "Pandect" && params.name != "index" && params.name !== 'login' && params.label !== undefined){
      History.push(params);
    }
  }
})
export default router
