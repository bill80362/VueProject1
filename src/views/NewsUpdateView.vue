<script setup>
import {onMounted, onUpdated, ref} from "vue";
import {useDataApiStore} from "../stores/api";
import router from "../router";

import {useRoute} from 'vue-router'

const DataApi = useDataApiStore();
const route = useRoute()
const uploadRef = ref(null);

const Data = ref({});
let NewsCategoryOption = ref([])

onMounted(async () => {
  //製作分類KeyValue
  await DataApi.apiNewsCategoryList()
  NewsCategoryOption.value = [];
  DataApi.NewsCategoryList.forEach((item) => {
    NewsCategoryOption.value.push({
      label: item.Title,
      value: item.NewsCategoryID,
    })
  });
  //
  if (route.params.id !== "0") {
    //修改
    DataApi.NewsList.forEach((item, index, array) => {
      if (route.params.id === item.NewsID) {
        Data.value = item;
        Data.value.ID = item.NewsID;
      }

    })
  } else {
    //新增
    Data.value = {
      ID: "0",
      CategoryID: "0",
      NewsID: "0",
      Title: "",
      Seq: "1",
      // Status: "Y",
      Content: "",
      // Content2: "",
      // Content3: "",
      // Content4: "",
      // Content5: "",
      // Content6: "",
      // Content7: "",
      // NewsTimeEnd: "",
      // NewsTimeStart: "",
      // Subtitle: "",
      Image1: "",
    }
  }

});
onUpdated(() => {

})

const handleBack = () => {
  router.go(-1);
}

const handleSubmit = async () => {
  //新增才有用
  Data.value.CategoryID = Data.value.NewsCategoryID
  //
  await DataApi.apiNewsUpdateCreate(Data.value);
  //觸發上傳事件
  uploadRef.value?.submit();
  //回列表
  handleBack();
}

</script>

<template>
  <n-page-header title="最新消息" subtitle="新增" @back="handleBack">
    <n-card>
      <n-form>
        <!--新增才有-->
        <n-form-item label="大分類" v-show="(route.params.id === '0')">
          <n-select v-model:value="Data.NewsCategoryID" :options="NewsCategoryOption"/>
        </n-form-item>
<!--        <n-form-item label="狀態">-->
<!--          <n-switch checked-value="Y" unchecked-value="N" v-model:value="Data.Status"/>-->
<!--        </n-form-item>-->
        <n-form-item label="排序">
          <n-input-number type="text" v-model:value="Data.Seq"/>
        </n-form-item>
        <n-form-item label="標題">
          <n-input type="text" v-model:value="Data.Title"/>
        </n-form-item>
<!--        <n-form-item label="副標題">-->
<!--          <n-input type="text" v-model:value="Data.Subtitle"/>-->
<!--        </n-form-item>-->
<!--        <n-form-item label="活動頁時間(起)">-->
<!--          <n-date-picker v-model:formatted-value="Data.NewsTimeStart" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" clearable />-->
<!--        </n-form-item>-->
<!--        <n-form-item label="活動頁時間(迄)">-->
<!--          <n-date-picker v-model:formatted-value="Data.NewsTimeEnd" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" clearable />-->
<!--        </n-form-item>-->
        <n-form-item label="內文1">
          <froala id="edit" :tag="'textarea'" :config="DataApi.FroalaEditorConfig" v-model="Data.Content"></froala>
        </n-form-item>
<!--        <n-form-item label="內文2">-->
<!--          <n-input type="textarea" v-model:value="Data.Content2"/>-->
<!--        </n-form-item>-->
<!--        <n-form-item label="內文3">-->
<!--          <n-input type="textarea" v-model:value="Data.Content3"/>-->
<!--        </n-form-item>-->
<!--        <n-form-item label="內文4">-->
<!--          <n-input type="textarea" v-model:value="Data.Content4"/>-->
<!--        </n-form-item>-->
<!--        <n-form-item label="內文5">-->
<!--          <n-input type="textarea" v-model:value="Data.Content5"/>-->
<!--        </n-form-item>-->
<!--        <n-form-item label="內文6">-->
<!--          <n-input type="textarea" v-model:value="Data.Content6"/>-->
<!--        </n-form-item>-->
<!--        <n-form-item label="內文7">-->
<!--          <n-input type="textarea" v-model:value="Data.Content7"/>-->
<!--        </n-form-item>-->
        <n-form-item label="圖片">
          <n-image
              width="200"
              :src="DataApi.ApiMasterUrl + Data.Image1"
          />
        </n-form-item>
        <n-form-item>
          <n-upload
              ref="uploadRef"
              accept="image/*"
              :action="DataApi.ApiMasterUrl + '/admin/news/image/' + Data.ID"
              :headers="{'Authorization': 'Bearer '+DataApi.Token}"
              method="post"
              name="Image1"
              max="1"
              :default-upload="false"
          >
            <n-button>上傳圖片</n-button>
          </n-upload>
        </n-form-item>
        <n-form-item>
          <n-button @click="handleSubmit">送出</n-button>
        </n-form-item>
      </n-form>
    </n-card>

  </n-page-header>
</template>
