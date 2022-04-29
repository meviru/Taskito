import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import AddNewTask from "../views/AddNewTask.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/sign-in',
  },
  {
    path: '/sign-in',
    component: () => import('@/views/SignIn.vue')
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
  {
    path: '/profile/',
    component: () => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListner = onAuthStateChanged(getAuth(), (user) => {
//       removeListner();
//       resolve(user);
//     }, reject)
//   })
// }

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = !to.matched.some((record) => { record.meta.requiresAuth });
//   if (requiresAuth) {
//     if (await getCurrentUser()) {
//       next();
//     } else {
//       next("/");
//     }
//   } else {
//     next();
//   }
// });

export default router
