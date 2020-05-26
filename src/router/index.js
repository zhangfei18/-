import Vue from 'vue'
import VueRouter from 'vue-router'
import Boll from '../views/Boll.vue'
import Rili from '../views/Rili.vue'
import Home from '../views/Home.vue'
import MyRili from '../views/MyRili.vue'
import { homedir } from 'os'

Vue.use(VueRouter)

const routes = [
  {
    path: '/boll',
    name: 'Boll',
    component: Boll
  },
  {
    path: '/rili',
    name: 'Rili',
    component: Rili
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Rili.vue')
  },
  {
    path:'/home',
    name: Home,
    component: Home
  },
  {
    path: '/myrili',
    name: 'myrili',
    component: MyRili
  }
]

const router = new VueRouter({
  routes
})

export default router
