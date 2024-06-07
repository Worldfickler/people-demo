import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from "@/views/AboutView.vue";
import InsertUserView from "@/views/InsertUserView.vue";
import ListUserView from "@/views/ListUserView.vue";
import UserInfoView from "@/views/UserInfoView.vue";
import UserManageView from "@/views/user/UserManageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '用户管理页面',
      component: UserManageView
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
      path: '/user/selectAll',
      name: '查询全部用户',
      component: ListUserView
    },
    {
      path: '/user/info/:userId',
      name: '用户详细信息',
      component: UserInfoView
    },
  ]
})

export default router
