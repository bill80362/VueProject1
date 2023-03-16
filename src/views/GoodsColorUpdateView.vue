<script setup>
import {onMounted, onUpdated, ref} from "vue";
import {useDataApiStore} from "../stores/api";
import router from "../router";

import { useRoute } from 'vue-router'

const DataApi = useDataApiStore();
const route = useRoute()

const Data = ref({});

onMounted(async () => {

    if(route.params.id){
        //修改
        DataApi.ColorList.forEach((item, index, array) => {
            if(route.params.id===item.ColorID)
                Data.value = item;
        })
    }else{
        //新增
        Data.value = {
            ColorTitle:"",
            GoodsID:1,
            Status:"Y",
        }
    }

});
onUpdated(() => {

})

const handleBack = () => {
    router.go(-1);
}

const handleSubmit = () => {
    DataApi.apiColorUpdateCreate(Data.value);
}

</script>

<template>
    <n-page-header title="商品分類管理" subtitle="新增" @back="handleBack">
        <n-card>
            <n-form>
                <n-form-item label="標題">
                    <n-input type="text" v-model:value="Data.ColorTitle"/>
                </n-form-item>
                <n-form-item label="狀態">
                    <n-switch checked-value="Y" unchecked-value="N" v-model:value="Data.Status"/>
                </n-form-item>
                <n-button @click="handleSubmit">送出</n-button>
            </n-form>
        </n-card>

    </n-page-header>
</template>
