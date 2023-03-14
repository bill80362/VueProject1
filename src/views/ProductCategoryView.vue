<script setup>
import { useMessage } from "naive-ui";
import {computed, ref, onMounted, onUpdated, h} from "vue";
import DataList from "../components/DataList.vue";
import { storeToRefs } from 'pinia'
import {useDataApiStore} from "../stores/api";
import router from "../router";
import {RouterLink} from "vue-router/dist/vue-router";
const DataApi = useDataApiStore();

const page = ref(1)
const pageTotal = ref(10)

onMounted(async ()=>{
  await DataApi.apiGoodsList()
});

const clickCreate = () =>{
  router.push("/productCategory/create");
}



onUpdated(()=>{
  // console.log("AAA");
})

</script>

<template>
  <n-page-header title="商品分類管理" :subtitle="'列表、總筆數:'+DataApi.GoodsList.length">
    <template #extra>
      <n-space>
        <n-button type="success" @click="clickCreate">新增</n-button>
      </n-space>
    </template>
    <n-grid :cols="1">
      <n-gi>
        <n-table :bordered="false" :single-line="false">
          <thead>
          <tr>
            <th>ID</th>
            <th>客制</th>
            <th>標題</th>
            <th>開關</th>
            <th>排序</th>
            <th>冷凍</th>
            <th>更新</th>
            <th>建立</th>
            <th>管理</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row,key) in DataApi.GoodsList">
            <td>{{row.GoodsID}}</td>
            <td>{{row.IsCustom}}</td>
            <td>{{row.Title}}</td>
            <td>{{row.Status}}</td>
            <td>{{row.Seq}}</td>
            <td>{{row.DeliveryFrozen}}</td>
            <td>{{row.updated_at}}</td>
            <td>{{row.created_at}}</td>
            <td>
              <n-button type="primary" style="margin: 3px;">編輯</n-button>
              <n-button type="warning" style="margin: 3px;">刪除</n-button>
            </td>
          </tr>
          </tbody>
        </n-table>
      </n-gi>
    </n-grid>

    <template #footer>
      <n-pagination
          v-model:page="page"
          :page-count="pageTotal"
          show-quick-jumper
          show-size-picker
      />
    </template>

  </n-page-header>
</template>
