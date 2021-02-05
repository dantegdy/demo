import Vue from 'vue'
import Router from 'vue-router'
import Liaojie from '@/pages/liaojie'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/liaojie',
      name:'Liaojie',
      component:()=>import(/* webpackChunName: "liaojie" */ '@/pages/liaojie')
    }
  ]
})
