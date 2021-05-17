import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gwiriekaat',
    name: 'Gwiriekaat',
    component: () => import(/* webpackChunkName: "about" */ '../views/Gwiriekaat.vue')
  },
  {
      path: '/stal',
      name: 'Stal',
      component: () => import(/* webpackChunkName: "about" */ '../views/Stal.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
