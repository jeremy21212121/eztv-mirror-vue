import Vue from 'vue'
import store from './store/index.js'
import App from './App.vue'
import VueRouter from 'vue-router'
import TorrentView from './components/TorrentView.vue'
import MyShowsView from './components/MyShowsView.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    component: TorrentView,
    exact: true
  },
  {
    path: '/search/:imdbID/:pageNumber',
    component: TorrentView,
    props: true
  },
  {
    path: '/latest/:pageNumber',
    component: TorrentView,
    props: true
  },
  {
    path: '/myshows/:pageNumber',
    component: MyShowsView,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/latest') {
    next('/latest/1')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
