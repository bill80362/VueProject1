<script setup>
import {h, ref} from "vue";
import {Settings} from "@vicons/ionicons5";
import {NIcon} from "naive-ui";
import { RouterLink } from 'vue-router'


const props = defineProps(['mode']);

const renderIcon = (icon) => {
  return () => h(NIcon, null, {default: () => h(icon)});
}
const menuOptions = ref([
  {
    label: ()=>h(RouterLink,{to:"/"},"首頁"),
    key: "home",
    icon: renderIcon(Settings),
  },
  {
    label: "商品系統",
    key: "Product",
    icon: renderIcon(Settings),
    children: [
      {
        label: ()=>h(RouterLink,{to:"/menu/category/list"},"商品大分類"),
        key: "menuCategory",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/menu/list"},"商品小分類"),
        key: "menu",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"商品管理"),
        key: "Product2",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"商品庫存"),
        key: "Product3",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/GoodsColor/list"},"顏色管理"),
        key: "GoodsColor",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/GoodsSize/list"},"尺寸管理"),
        key: "GoodsSize",
        icon: renderIcon(Settings),
      },
    ],
  },
  {
    label: "訂單管理",
    key: "order1",
    icon: renderIcon(Settings),
    children: [
      {
        label: ()=>h(RouterLink,{to:"/productCategory/list"},"全部訂單"),
        key: "order-c-all",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"待付款"),
        key: "order-c-2",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"待出貨"),
        key: "order-c-3",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"已出貨"),
        key: "order-c-4",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"結案"),
        key: "order-c-5",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"已取消"),
        key: "order-c-6",
        icon: renderIcon(Settings),
      },
    ],
  },
  {
    label: "購物車系統",
    key: "Shopping",
    icon: renderIcon(Settings),
    children: [
      {
        label: ()=>h(RouterLink,{to:"/productCategory/list"},"金流管理"),
        key: "Shopping1",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"物流管理"),
        key: "Shopping2",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"優惠管理"),
        key: "Shopping3",
        icon: renderIcon(Settings),
      },
    ],
  },
  {
    label: "內容管理",
    key: "ContentM",
    icon: renderIcon(Settings),
    children: [
      {
        label: ()=>h(RouterLink,{to:"/productCategory/list"},"關於我們"),
        key: "ContentM1",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/news/category/list"},"最新消息分類"),
        key: "NewsCategory",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/news/list"},"最新消息"),
        key: "News",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"首頁Banner"),
        key: "ContentM3",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"QA問題"),
        key: "ContentM4",
        icon: renderIcon(Settings),
      },
      {
        label: ()=>h(RouterLink,{to:"/product/list"},"影片管理"),
        key: "ContentM6",
        icon: renderIcon(Settings),
      },
    ],
  },
  {
    label: "系統設定",
    key: "config",
    icon: renderIcon(Settings),
  }
]);

</script>

<template>
  <div>
    <n-menu :mode="props.mode" :options="menuOptions"/>
  </div>
</template>

<style scoped>

</style>
