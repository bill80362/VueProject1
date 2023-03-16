<script setup>
import {ref, onMounted, onUpdated, h, onBeforeMount} from "vue";
import {useDataApiStore} from "../stores/api";
import router from "../router";
import {NButton} from "naive-ui";

const DataApi = useDataApiStore();

const page = ref(1)
const pageTotal = ref(10)
const pagination = ref({
    page:1,
    pageSize:pageTotal,
})

const TableHeader = ref([
    {
        title: 'ID',
        key: 'ID',
        defaultSortOrder: 'ascend',
        sorter: 'default',
    },
    {
        title: '標題',
        key: 'Title',
        defaultSortOrder: 'ascend',
        // sorter: 'default',
    },
    {
        title: '開關',
        key: 'Status',
        defaultSortOrder: 'ascend',
        // sorter: 'default',
    },
    {
        title: '更新',
        key: 'updated_at',
        defaultSortOrder: 'ascend',
        // sorter: 'default',
    },
    {
        title: '建立',
        key: 'created_at',
        defaultSortOrder: 'ascend',
        // sorter: 'default',
    },
    {
        title: '管理',
        key: 'operate',
        render (row) {
            return h(
                NButton,
                {
                    size: 'small',
                    type: 'primary',
                    onClick: () => clickUpdate(row.ID)
                },
                { default: () => '編輯' }
            )
        }
    },
])
const TableData = ref([]);

//
onBeforeMount(async ()=>{
    DataApi.ColorList = [];
})

onMounted(async ()=>{
    await DataApi.apiColorList()
    //放入資料
    TableData.value = [];
    DataApi.ColorList.forEach((row)=>{
        TableData.value.push(
            {
                ID:row.ColorID,
                Title:row.ColorTitle,
                Status:row.Status,
                updated_at:row.updated_at,
                created_at:row.created_at,
                operate: "",
            }
        );
    })
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
          <n-data-table
            ref="table"
            :columns="TableHeader"
            :data="TableData"
          />
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

<!--    <template #footer>-->
<!--      <n-pagination-->
<!--          v-model:page="page"-->
<!--          :page-count="pageTotal"-->
<!--          show-quick-jumper-->
<!--          show-size-picker-->
<!--      />-->
<!--    </template>-->

  </n-page-header>
</template>
