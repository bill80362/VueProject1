import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductCategoryView from '../views/ProductCategoryView.vue'

import {useDataApiStore} from "../stores/api";
// const DataApi = useDataApiStore();
// console.log(DataApi)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'Home',
      component: DashboardView
    },
    {
      path: '/productCategory/list',
      component: ProductCategoryView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to)=>{
  const DataApi = useDataApiStore();
  if(!DataApi.isLogin && to.name!=="Login") {
    //沒有登入，先強制導到登入
    return {name: 'Login'}
  }
})


export default router