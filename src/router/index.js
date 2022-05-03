import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { reset: true }
  },
  {
    path: '/list-of-songs',
    name: 'list-of-songs',
    component: ListView
  },
  {
    path: '/:catchAll(.*)',
    name: 'page-not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
