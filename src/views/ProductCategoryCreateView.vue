<script setup>
import {onMounted, onUpdated, ref} from "vue";
import {useDataApiStore} from "../stores/api";
import router from "../router";

const DataApi = useDataApiStore();
const Data = ref({});
onMounted(async () => {
  //拿取該物件
  DataApi.GoodsList.forEach((item,index,array)=>{
    Data.value = item;
    return true;//拿到值就離開
  })

});
onUpdated(() => {

})

const handleBack = () => {
  router.go(-1);
}

</script>

<template>
  <n-page-header title="商品分類管理" subtitle="新增" @back="handleBack">
    <n-card>
      <n-form>
        <n-form-item label="標題">
          <n-input type="text" v-model:value="Data.Title"/>
        </n-form-item>
        <n-form-item label="排序">
          <n-input type="text" v-model:value="Data.Title"/>
        </n-form-item>
        <n-form-item label="狀態">
          <n-switch checked-value="Y" unchecked-value="N" v-model:value="Data.Status" />
        </n-form-item>
        <n-form-item label="時間選擇">
          <n-date-picker v-model:value="Data.GoodsTimeStart" type="datetime" clearable />
        </n-form-item>
        <n-form-item label="內文">
          <n-input v-model:value="Data.Description" type="textarea"  />
        </n-form-item>
        <n-button>送出</n-button>
      </n-form>
    </n-card>

  </n-page-header>
</template>
