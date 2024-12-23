import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import EmptyView from '@/views/EmptyView.vue'
import AuthView from '@/views/AuthView.vue'

import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import NotFound from '@/components/NotFound.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/',
      meta: {
        auth: true
      },
      component: DefaultLayout,
      children: [
        {
          path: '/chat/:id',
          name: 'chat',
          component: MainView,
          props: true
        },
        {
          path: '',
          component: EmptyView
        }
      ]
    },
    {
      path: '/register',
      component: AuthLayout,
      children: [
        {
          path: '',
          component: AuthView,
          meta: {
            title: 'Регистрация'
          }
        }
      ]
    },
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          component: AuthView,
          meta: {
            title: 'Авторизация'
          }
        }
      ]
    },
    {
      path: '/logout',
      meta: {
        auth: true,
        logout: true
      },
      component: AuthLayout,
      children: [
        {
          path: '',
          component: AuthView,
          meta: {
            title: 'Авторизация'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const isAuthenticated = !!authStore.token
  const requireAuth = to.matched.some((record) => record.meta.auth)

  if (!requireAuth) {
    if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
      next('/')
    } else {
      next()
    }
  } else {
    if (!isAuthenticated || to.path === '/logout') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
