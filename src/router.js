import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import(/* webpackChunkName: "table" */ './views/Notes.vue')
    },
    {
      path: '/note/:id',
      component: () => import(/* webpackChunkName: "table" */ './views/Note.vue')
    }
  ]
})
