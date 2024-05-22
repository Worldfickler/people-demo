import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from "@/views/AboutView.vue";
import InsertUserView from "@/views/InsertUserView.vue";
import ListUserView from "@/views/ListUserView.vue";
import SelectUserView from "@/views/SelectUserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/user/insert',
      name: '添加用户',
      component: InsertUserView
    },
    {
      path: '/user/select',
      name: '查询单个用户',
      component: SelectUserView
    },
    {
      path: '/user/selectAll',
      name: '查询全部用户',
      component: ListUserView
    },
  ]
})

export default router
