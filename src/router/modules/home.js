 import Index from '@/components/views/Index'
 import Login from '@/components/Login'
 export default [
   // 首页
   {
     path: '/index',
     name: 'index',
     component: Index,
     meta: {auth: true},
     children:[
       {
         path: '/index/pandect',
         component: () => import('@/components/views/Pandect/Pandect'),
         name: 'Pandect',
         meta: {auth: true}
       },
       {
         path: '/index/comment',
         component: () => import('@/components/views/Comment/Comment'),
         name: 'Comment',
         meta: {auth: true}
       },
       {
         path: '/index/user',
         component: () => import('@/components/views/User/User'),
         name: 'User',
         meta: {auth: true}
       },
     ]
   },
    {
     path: '/Login',
     name: 'Login',
     component: Login
   }
 ]
