// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import Login from './components/Login.vue'
import Restricted from './components/Restricted.vue'
import Signup from './components/Signup.vue'
import ChangePassword from './components/ChangePassword.vue'
import auth from './auth'

Vue.use(VueRouter)
Vue.use(VueResource)

// Check the users auth status when the app starts
auth.checkAuth()

// Setup routing and match routes to components
// Redirect to the login for unmatched routes
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/restricted',
    name: 'restricted',
    component: Restricted,
    beforeEnter: (to, from, next) => {
      next(auth.user.authenticated)
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/change_password',
    name: 'change_password',
    component: ChangePassword
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const routerOptions = { routes }
{{#history_mode}}
routerOptions['mode'] = 'history'
{{/history_mode}}
const router = new VueRouter(routerOptions)

new Vue({ // eslint-disable-line no-new
  router,
  render: h => h(App)
}).$mount('#app')

export default { router }
