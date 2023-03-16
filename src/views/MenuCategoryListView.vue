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
    sorter: 'default',
  },
  {
    title: '開關',
    key: 'Status',
    defaultSortOrder: 'ascend',
    sorter: 'default',
  },
  {
    title: '排序',
    key: 'Seq',
    defaultSortOrder: 'ascend',
    sorter: 'default',
  },
  {
    title: '更新',
    key: 'updated_at',
    defaultSortOrder: 'ascend',
    sorter: 'default',
  },
  {
    title: '建立',
    key: 'created_at',
    defaultSortOrder: 'ascend',
    sorter: 'default',
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
  DataApi.MenuCategoryList = [];
})

onMounted(async ()=>{
  await DataApi.apiMenuCategoryList()
  //放入資料
  TableData.value = [];
  DataApi.MenuCategoryList.forEach((row)=>{
    TableData.value.push(
        {
          ID:row.MenuCategoryID,
          Title:row.Title,
          Status:row.Status,
          Seq:row.Seq,
          updated_at:row.updated_at,
          created_at:row.created_at,
        }
    );
  })

});

const clickUpdate = (id) =>{
  router.push("/menu/category/update/"+id);
}

</script>

<template>
  <n-page-header title="大分類管理" :subtitle="'列表、總筆數:'+DataApi.MenuCategoryList.length">
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
      </n-gi>
    </n-grid>

  </n-page-header>
</template>
