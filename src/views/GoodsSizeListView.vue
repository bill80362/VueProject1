<script setup>
import {ref, onMounted, onUpdated, h, onBeforeMount} from "vue";
import {useDataApiStore} from "../stores/api";
import router from "../router";
import {NButton} from "naive-ui";

const DataApi = useDataApiStore();

const page = ref(1)
const TableLoading = ref(false)
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
    DataApi.SizeList = [];
})

onMounted(async ()=>{
  //載入中
  TableLoading.value = true;
  //
    await DataApi.apiSizeList()
    //放入資料
    TableData.value = [];
    DataApi.SizeList.forEach((row)=>{
        TableData.value.push(
            {
                ID:row.SizeID,
                Title:row.SizeTitle,
                Status:row.Status,
                updated_at:row.updated_at,
                created_at:row.created_at,
            }
        );
    })
  //載入完成
  TableLoading.value = false;
});

const clickUpdate = (id) =>{
  router.push("/GoodsSize/update/"+id);
}

</script>

<template>
  <n-page-header title="商品顏色管理" :subtitle="'列表、總筆數:'+DataApi.SizeList.length">
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
            :loading = "TableLoading"
          />
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
