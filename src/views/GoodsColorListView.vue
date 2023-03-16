<script setup>
import {ref, onMounted, onUpdated, h, onBeforeMount} from "vue";
import {useDataApiStore} from "../stores/api";
import router from "../router";

const DataApi = useDataApiStore();

const page = ref(1)
const pageTotal = ref(10)

onBeforeMount(async ()=>{
    DataApi.ColorList = [];
})

onMounted(async ()=>{
  await DataApi.apiColorList()
});

const clickUpdate = (id) =>{
  router.push("/GoodsColor/update/"+id);
}

</script>

<template>
  <n-page-header title="商品顏色管理" :subtitle="'列表、總筆數:'+DataApi.ColorList.length">
    <template #extra>
      <n-space>
        <n-button type="success" @click="clickUpdate(0)">新增</n-button>
      </n-space>
    </template>
    <n-grid :cols="1">
      <n-gi>
        <n-table :bordered="false" :single-line="false">
          <thead>
          <tr>
            <th>ID</th>
            <th>標題</th>
            <th>開關</th>
            <th>更新</th>
            <th>建立</th>
            <th>管理</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row,key) in DataApi.ColorList">
            <td>{{row.ColorID}}</td>
            <td>{{row.ColorTitle}}</td>
            <td>{{row.Status}}</td>
            <td>{{row.updated_at}}</td>
            <td>{{row.created_at}}</td>
            <td>
              <n-button type="primary" style="margin: 3px;" @click="clickUpdate(row.ColorID)">編輯</n-button>
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
