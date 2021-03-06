import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import detail from '../views/detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    meta:{requireAuth:true},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Home',
    meta:{requireAuth:true},
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    meta:{requireAuth:true},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "detail" */ '../views/detail.vue'),
    children:[
      { path: `${localStorage.getItem('path')}`, component: detail}
  ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
