import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import AddNewTask from "../views/AddNewTask.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/dashboard'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/dashboard'
      },
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'task',
        component: () => import('@/views/Task.vue'),
      },
      {
        path: 'board',
        component: () => import('@/views/Board.vue')
      },
      {
        path: 'chat',
        component: () => import('@/views/Chat.vue')
      },
    ]
  },
  {
    path: '/tabs/task/add',
    component: AddNewTask
  },
  {
    path: '/tabs/task/edit/:id',
    component: AddNewTask
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
