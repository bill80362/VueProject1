<script setup>
import {onMounted, onUpdated, ref} from "vue";
import {useDataApiStore} from "../stores/api";
import router from "../router";

import { useRoute } from 'vue-router'

const DataApi = useDataApiStore();
const route = useRoute()

const Data = ref({});

onMounted(async () => {

    if(route.params.id !== "0"){
        //修改
        DataApi.SizeList.forEach((item, index, array) => {
            if(route.params.id===item.SizeID){
                Data.value = item;
                Data.value.ID = item.SizeID;
            }

        })
    }else{
        //新增
        Data.value = {
            ID: "0" ,
            SizeID: "0",
            SizeTitle:"",
            GoodsID:"1",
            Status:"Y",
        }
    }

});
onUpdated(() => {

})

const handleBack = () => {
    router.go(-1);
}

const handleSubmit = async () => {
    await DataApi.apiSizeUpdateCreate(Data.value);
    handleBack();
}

</script>

<template>
    <n-page-header title="商品分類管理" subtitle="新增" @back="handleBack">
        <n-card>
            <n-form>
                <n-form-item label="標題">
                    <n-input type="text" v-model:value="Data.SizeTitle"/>
                </n-form-item>
                <n-form-item label="狀態">
                    <n-switch checked-value="Y" unchecked-value="N" v-model:value="Data.Status"/>
                </n-form-item>
                <n-button @click="handleSubmit">送出</n-button>
            </n-form>
        </n-card>

    </n-page-header>
</template>
