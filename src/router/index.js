import { createRouter, createWebHistory } from 'vue-router'
import {useDataApiStore} from "../stores/api";
/**通用*/
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
/**MenuCategory*/
import MenuCategoryListView from '../views/MenuCategoryListView.vue'
import MenuCategoryUpdateView from '../views/MenuCategoryUpdateView.vue'
/**Menu*/
import MenuListView from '../views/MenuListView.vue'
import MenuUpdateView from '../views/MenuUpdateView.vue'
/**顏色*/
import GoodsColorListView from '../views/GoodsColorListView.vue'
import GoodsColorUpdateView from '../views/GoodsColorUpdateView.vue'
/**Size*/
import GoodsSizeListView from '../views/GoodsSizeListView.vue'
import GoodsSizeUpdateView from '../views/GoodsSizeUpdateView.vue'


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
      /**menu category*/
    {
      path: '/menu/category/list',
      component: MenuCategoryListView
    },
    {
      path: '/menu/category/update/:id',
      component: MenuCategoryUpdateView
    },
    /**menu*/
    {
      path: '/menu/list',
      component: MenuListView
    },
    {
      path: '/menu/update/:id',
      component: MenuUpdateView
    },
    /**Color*/
    {
      path: '/GoodsColor/list',
      component: GoodsColorListView
    },
    {
      path: '/GoodsColor/update/:id',
      component: GoodsColorUpdateView
    },
    /**Size*/
    {
      path: '/GoodsSize/list',
      component: GoodsSizeListView
    },
    {
      path: '/GoodsSize/update/:id',
      component: GoodsSizeUpdateView
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
