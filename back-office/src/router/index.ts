import { authMiddleware } from '@/middleware';
import { createRouter, createWebHistory } from 'vue-router';

export enum ROUTES_NAMES {
  HOME = 'home',
  HOME_ADMIN = 'home-admin',
  USERS_ADMIN = 'users-admin',
  LOGIN = 'login',
  REGISTER = 'register',
  INFORMATIONS = 'informations',
  NOT_FOUND = 'not-found',
  GRAPHS = 'graphs'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES_NAMES.HOME,
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuth = await authMiddleware();
        if (!isAuth) return next({ name: ROUTES_NAMES.LOGIN });
        next();
      }
    },
    {
      path: '/login',
      name: ROUTES_NAMES.LOGIN,
      component: () => import('@/views/auth/LoginView.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuth = await authMiddleware();
        if (isAuth) return next({ name: ROUTES_NAMES.HOME });
        next();
      }
    },
    {
      path: '/register',
      name: ROUTES_NAMES.REGISTER,
      component: () => import('@/views/auth/Register.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuth = await authMiddleware();
        if (isAuth) return next({ name: ROUTES_NAMES.HOME });
        next();
      }
    },
    {
      path: '/my-informations',
      name: ROUTES_NAMES.INFORMATIONS,
      component: () => import('@/views/MesInformations.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuth = await authMiddleware();
        if (!isAuth) return next({ name: ROUTES_NAMES.LOGIN });
        next();
      }
    },
    {
      path: '/graphs',
      name: ROUTES_NAMES.GRAPHS,
      component: () => import('@/views/Graphs.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuth = await authMiddleware();
        if (!isAuth) return next({name: ROUTES_NAMES.GRAPHS});
        next();
      }
    },
    {
      path: '/admin',
      children: [
        {
          path: '',
          name: ROUTES_NAMES.HOME_ADMIN,
          component: () => import('@/views/admin/Home.vue'),
          beforeEnter: async (to, from, next) => {
            const isAuth = await authMiddleware();
            if (!isAuth) return next({ name: ROUTES_NAMES.LOGIN });
            next();
          }
        },
        {
          path: 'users',
          name: ROUTES_NAMES.USERS_ADMIN,
          component: () => import('@/views/admin/ListUser.vue'),
          beforeEnter: async (to, from, next) => {
            const isAuth = await authMiddleware();
            if (!isAuth) return next({ name: ROUTES_NAMES.LOGIN });
            next();
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: ROUTES_NAMES.NOT_FOUND,
      component: () => import('@/views/404.vue')
    }
  ]
});

export default router;
