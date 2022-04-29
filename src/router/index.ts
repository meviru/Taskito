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
    component: () => import('@/views/SignIn.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/tabs/',
    component: TabsPage,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        redirect: '/tabs/dashboard'
      },
      {
        path: 'dashboard',
        name: "dashboard",
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
    component: AddNewTask,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tabs/task/edit/:id',
    component: AddNewTask,
    meta: {
      requiresAuth: true
    }
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

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListner = onAuthStateChanged(getAuth(), (user) => {
      removeListner();
      resolve(user);
    }, reject)
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router
