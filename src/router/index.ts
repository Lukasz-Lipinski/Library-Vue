import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router';

import HomeView from '../views/HomeVue.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/account',
    name: 'account',
    component: () =>
      import('../views/AccountVue.vue'),
  },
  {
    path: '/registration',
    name: 'registration',
    component: () =>
      import('../views/RegisterVue.vue'),
  },
  {
    path: '/books',
    name: 'books',
    component: () =>
      import('../views/BooksVue.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import('../views/AboutVue.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    component: () =>
      import('../views/SigninVue.vue'),
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () =>
      import('../views/GalleryVue.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
