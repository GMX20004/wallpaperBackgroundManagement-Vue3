import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'pageLayout',
    component: () => import('@/views/pageLayout/index.vue'),
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('@/views/homePage/index.vue'),
        meta: { keepAlive: true }
      },
      {
        path: '/AboutView',
        name: 'AboutView',
        component: () => import('@/views/AboutView.vue'),
        meta: { keepAlive: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
