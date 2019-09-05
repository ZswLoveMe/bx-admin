import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/views/Index'
import Login from '@/components/Login'
import store from '../store'
import History from '../utils/history';
Vue.use(Router)
Vue.use(History)

// 实例化之前，扩展Router
Router.prototype.goBack = function () {
  this.isBack = true;
}

 let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {auth: true}
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {auth: true},
      children:[
        {
          path: '/index/comment',
          component: () => import('@/components/views/Comment/Comment'),
          name: 'Comment',
          meta: {auth: true}
        },
        {
          path: '/index/pandect',
          component: () => import('@/components/views/Pandect/Pandect'),
          name: 'Pandect',
          meta: {auth: true}
        },
        {
          path: '/index/user',
          component: () => import('@/components/views/User/User'),
          name: 'User',
          meta: {auth: true}
        },
        {
          path:'/article/editArticle',
          name: 'EditArticle',
          component: () => import('@/components/views/Article/editArticle'),
          meta: {auth: true}
        },
        {
          path:'/article/allArticle',
          name: 'AllArticle',
          component: () => import('@/components/views/Article/AllArticle'),
          meta: {auth: true}
        }
      ]
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
