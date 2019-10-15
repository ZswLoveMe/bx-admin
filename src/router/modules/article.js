import Index from '@/components/views/Index'
export default [
  // 首页
  {
    path: '/index',
    name: 'index',
    component: Index,
    meta: {auth: true},
    children:[
      {
        path:'/article/editArticle',
        name: 'EditArticle',
        component: () => import('@/components/views/Article/editArticle'),
        meta: {auth: true},

      },
      {
        path:'/article/allArticle',
        name: 'AllArticle',
        component: () => import('@/components/views/Article/AllArticle'),
        meta: {auth: true}
      },
      {
        path:'/article/editArticle',
        name: 'EditArticle',
        component: () => import('@/components/views/Article/editArticle'),
        meta: {auth: true},

      },
      {
        path:'/article/Catalog',
        name: 'Catalog',
        component: () => import('@/components/views/Article/Catalog'),
        meta: {auth: true}
      }
    ]
  }
]
