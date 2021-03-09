import Vue from 'vue'
import Router from 'vue-router'
// import Liaojie from '@/pages/liaojie'
import Home from '@/pages/Home'
import store from '../../store/index'
Vue.use(Router)

const router= new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/liaojie',
      name:'liaojie',
      component:()=>import(/* webpackChunName: "liaojie" */ '@/pages/liaojie')
    },
    {
      path: '/xinzeng',
      name:'xinzeng',
      component:()=>import(/* webpackChunName: "xinzeng" */ '@/pages/xinzeng')
    },
    {
      path: '/login',
      name:'login',
      component:()=>import(/* webpackChunName: "login" */ '@/pages/login')
    },
    {
      path: '/wode',
      name:'wode',
      component:()=>import(/* webpackChunName: "wode" */ '@/pages/wode'),
      beforeEnter:(to,from,next)=>{
        // console.log(to,from)
        // console.log(store.state)
        if(!store.state.username){
          if(window.localStorage.getItem('username')){
            store.state.username = window.localStorage.getItem('username')
          }else{
            next('/login')
          }
        }
        next()
      }
    }
  ]
})

export default router
