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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
