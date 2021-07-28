import Vue from 'vue'
import Router from 'vue-router'
import { store } from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      redirect: '/',
      component: () => import('./views/Home.vue'),
      beforeEnter: (to, from) => {
        if(from.name === "auth" && store.state.loading && store.getters.isAuthenticated) store.commit("loading", false); 
      }
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      beforeEnter: (to, from) => {
        if(from.name === "auth" && store.state.loading && store.getters.isAuthenticated) store.commit("loading", false); 
      }
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
      name: 'notes/:id',
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
      component: () => import('./views/Auth.vue'),

    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // store.commit("loading", false)

  if (to.name !== "auth" && from.name !== "auth" && !store.getters.isAuthenticated) next({ name: "auth", query: {c: "login"}  })

    if (to.hash.length) {
      next(false)
      setTimeout(()=>{
        store.commit("setUser")
        next("/")
      }, 2000)
    }
    else next()
  })

export default router
