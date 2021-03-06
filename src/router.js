import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () =>
        import(/* webpackChunkName: "search" */ './views/Search.vue')
    },
    {
      path: '/:id',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue')
    },
    {
      path: '/:id/:repo',
      name: 'repo',
      component: () =>
        import(/* webpackChunkName: "repo" */ './views/Repository.vue')
    },
    {
      path: '/:id/:repo/blob/master/*',
      name: 'repo-browsing',
      component: () =>
        import(/* webpackChunkName: "repo-browsing" */ './views/Repository.vue')
    }
  ]
})
