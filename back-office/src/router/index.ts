import { authMiddleware } from '@/middleware';
import { createRouter, createWebHistory } from 'vue-router';

export enum ROUTES_NAMES {
  HOME = 'home',
  LOGIN = 'login',
  REGISTER = 'register',
  INFORMATIONS = 'informations'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES_NAMES.HOME,
      component: () => import('../views/HomeView.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuth = await authMiddleware();
        if (!isAuth) return next({ name: ROUTES_NAMES.LOGIN });
        next();
      }
    },
    {
      path: '/login',
      name: ROUTES_NAMES.LOGIN,
      component: () => import('../views/auth/LoginView.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuth = await authMiddleware();
        if (isAuth) return next({ name: ROUTES_NAMES.HOME });
        next();
      }
    },
    {
      path: '/register',
      name: ROUTES_NAMES.REGISTER,
      component: () => import('../views/auth/Register.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuth = await authMiddleware();
        if (isAuth) return next({ name: ROUTES_NAMES.HOME });
        next();
      }
    },
    {
      path: '/my-informations',
      name: ROUTES_NAMES.INFORMATIONS,
      component: () => import('../views/MesInformations.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuth = await authMiddleware();
        if (!isAuth) return next({ name: ROUTES_NAMES.LOGIN });
        next();
      }
    }
  ]
});

export default router;
