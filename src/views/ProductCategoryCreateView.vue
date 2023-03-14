<script setup>
import {onMounted, onUpdated} from "vue";
import {useDataApiStore} from "../stores/api";
import router from "../router";

const DataApi = useDataApiStore();

onMounted(async () => {

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
          <n-input type="text"/>
        </n-form-item>
        <n-form-item label="內文">
          <n-input type="textarea"/>
        </n-form-item>
        <n-button>送出</n-button>
      </n-form>
    </n-card>

  </n-page-header>
</template>
