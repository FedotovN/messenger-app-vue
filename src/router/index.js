import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/config'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/MainPage'),
    meta: {layout: 'main', auth: true}
  },
  {
    path: '/:id',
    name: "Chat",
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/ChatPage')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'profile', auth: true},
    component: () => import('@/views/ProfilePage')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'auth'},
    component: () => import('@/views/LoginPage')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'auth'},
    component: () => import('@/views/RegisterPage')
  },
  {
    path: '/register/photo',
    name: 'Profile photo',
    meta: {layout: 'auth'},
    component: () => import('@/views/RegisterPhoto')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  const currUser = auth.currentUser,
        requireAuth = to.matched.some(record => record.meta.auth)
  if(requireAuth && !currUser)
    next('/login')
  else next()
})

export default router
