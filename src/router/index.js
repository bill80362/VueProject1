import { createRouter, createWebHistory } from 'vue-router'
import {useDataApiStore} from "../stores/api";
/**通用*/
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
/**productCategory*/
import ProductCategoryView from '../views/ProductCategoryView.vue'
import ProductCategoryCreateView from '../views/ProductCategoryCreateView.vue'
/**顏色*/
import GoodsColorListView from '../views/GoodsColorListView.vue'
import GoodsColorUpdateView from '../views/GoodsColorUpdateView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      /**通用*/
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
      /**productCategory*/
    {
      path: '/productCategory/list',
      component: ProductCategoryView
    },
    {
      path: '/productCategory/create',
      component: ProductCategoryCreateView
    },
    /**productCategory*/
    {
      path: '/GoodsColor/list',
      component: GoodsColorListView
    },
    {
      path: '/GoodsColor/update/:id',
      component: GoodsColorUpdateView
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
