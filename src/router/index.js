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
      path: '/app',
      name: 'Home',
      component: Home
    },
    {
      path: '/app/liaojie',
      name:'liaojie',
      component:()=>import(/* webpackChunName: "liaojie" */ '@/pages/liaojie')
    },
    {
      path: '/app/xinzeng',
      name:'xinzeng',
      component:()=>import(/* webpackChunName: "xinzeng" */ '@/pages/xinzeng')
    },
    {
      path: '/app/login',
      name:'login',
      component:()=>import(/* webpackChunName: "login" */ '@/pages/login')
    },
    {
      path: '/app/wode',
      name:'wode',
      component:()=>import(/* webpackChunName: "wode" */ '@/pages/wode'),
      beforeEnter:(to,from,next)=>{
        // console.log(to,from)
        // console.log(store.state)
        store.state.username = window.localStorage.getItem('username')
        store.state.user_id = window.localStorage.getItem('user_id')
        if(!store.state.username || !store.state.user_id){
          if(window.localStorage.getItem('username')){
            store.state.username = window.localStorage.getItem('username')
          }else{
            next('/app/login')
          }
        }
        next()
      }
    },
    {
      path: '/app/register',
      name:'register',
      component:()=>import(/* webpackChunName: "register" */ '@/pages/register')
    },
  ]
})

export default router
