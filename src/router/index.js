import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
//import Home from '../views/Home.vue'
import Home from '../views/home/home.vue'
import Register from '../views/register/register.vue'
import Login from '../views/login/login.vue'
import About from '../views/about/about.vue'
import PublicHeader from '../components/layout/PublicHeader.vue'
import Dashboard from '../views/user/dashboard.vue'
import ErrorPage from '../components/error/Error.vue'
import Quiz from '../views/quiz/quiz.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      'layout': PublicHeader
    }
  },
  {
    path: '/quiz',
    name: 'Quiz',
    components: {
      default: Quiz,
      'layout': PublicHeader
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    components: {
      default: Dashboard,
      'layout': PublicHeader
    }
  },
  {
    path: '/register',
    name: 'Register',
    components: {
      default: Register,
      'layout': PublicHeader
    },
    beforeEnter(to, from, next) {
      console.log(store.getters['AUTH/isLoggedIn']);
        if (store.getters['AUTH/isLoggedIn']) {
          next(false);
        } else{
          next();
        }
    },
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      default: Login,
      'layout': PublicHeader
    },
    beforeEnter(to, from, next) {
        if (store.getters['AUTH/isLoggedIn']) {
          next(false);
        } else{
          next();
        }
    },
  },
  {
    path: '/about',
    name: 'About',
    components: {
      default: About,
      'layout': PublicHeader
    }
  },
  {
    path: 'not-found',
    name: 'errorpage',
    component: ErrorPage
  },
  {
    path: '*',
    redirect: {
      name: 'errorpage'
    }
  },

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['AUTH/isLoggedIn']) {
      next();
      console.log(store.getters['AUTH/isLoggedIn']);
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router
