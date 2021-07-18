import Vue from 'vue'
import Router from 'vue-router'
import { store } from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('./views/Tasks.vue')
    },
     {
      path: '/notes',
      name: 'notes',
      component: () => import('./views/Notes.vue')
    },
    {
      path: '/notes/:id',
      component: () => import('./views/Note.vue')
    },
    {
      path: '/notebooks',
      name: 'notebooks',
      component: () => import('./views/Notebooks.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/Auth.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== "auth" && from.name !== "auth" && !store.getters.isAuthenticated) next({ name: "auth", query: {c: "login"}  })
    else next()
})
export default router
