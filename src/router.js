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
      path: '/signin',
      name: 'signin',
      component: () => import('./views/SignIn.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'signin' && !store.getters.isAuthenticated) next({ name: 'signin' })
    else next()
})

export default router
