import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/views/Index'
import Login from '@/components/Login'
import store from '../store'
Vue.use(Router)

 let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {auth: true}
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})

// 守卫
router.beforeEach((to,from,next) => {
  if (to.meta.auth) { // 查看路由是否需要登录
    // 需要认证，则检查令牌
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
export default router