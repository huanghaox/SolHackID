import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/register'
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/HackerProfile',
      name: 'HackerProfile',
      meta: { transition: 'slide-left' },
      component: () => import('../views/HackerProfile.vue')
    },
    {
      path: '/mintnft',
      name: 'mintnft',
      component: () => import('../views/MintNFT.vue')
    }
  ]
})

export default router
