import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
  ]
})
