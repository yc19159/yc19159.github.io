import Vue from 'vue'
import Router from 'vue-router'
import userLogin from '@/page/userLogin/userLogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'userLogin',
      component: userLogin
    },
     {
      path: '/orderList',
      name: 'orderList',
      component: () => import('@/page/orderList/orderList.vue')
     }
  ]
})
