<script setup>
import {onMounted, onUpdated, ref} from "vue";
import {useDataApiStore} from "../stores/api";
import router from "../router";

import {useRoute} from 'vue-router'

const DataApi = useDataApiStore();
const route = useRoute()

const Data = ref({});
let MenuCategoryOption = ref([])

onMounted(async () => {
    //製作分類KeyValue
    await DataApi.apiMenuCategoryList()
    MenuCategoryOption.value = [];
    DataApi.MenuCategoryList.forEach((item) => {
        MenuCategoryOption.value.push({
            label: item.Title,
            value: item.MenuCategoryID,
        })
    });
    //
    if (route.params.id !== "0") {
        //修改
        DataApi.MenuList.forEach((item, index, array) => {
            if (route.params.id === item.MenuID) {
                Data.value = item;
                Data.value.ID = item.MenuID;
            }

        })
    } else {
        //新增
        Data.value = {
            ID: "0",
            CategoryID: "0",
            MenuID: "0",
            Title: "",
            Seq: "1",
            Status: "Y",
            Content: "",
            Content2: "",
            Content3: "",
            Content4: "",
            Content5: "",
            Content6: "",
            Content7: "",
            MenuTimeEnd:"",
            MenuTimeStart:"",
            Subtitle:"",
            Image1:"",
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
    Data.value.CategoryID = Data.value.MenuCategoryID
    //
    await DataApi.apiMenuUpdateCreate(Data.value);
    handleBack();
}

</script>

<template>
    <n-page-header title="商品大分類" subtitle="新增" @back="handleBack">
        <n-card>
            <n-form>
                <!--新增才有-->
                <n-form-item label="大分類" v-show="(route.params.id === '0')">
                <n-select v-model:value="Data.MenuCategoryID" :options="MenuCategoryOption" />
                </n-form-item>
                <n-form-item label="標題">
                    <n-input type="text" v-model:value="Data.Title"/>
                </n-form-item>
                <n-form-item label="副標題">
                    <n-input type="text" v-model:value="Data.Subtitle"/>
                </n-form-item>
                <n-form-item label="內文1">
                    <n-input type="textarea" v-model:value="Data.Content"/>
                </n-form-item>
                <n-form-item label="內文2">
                    <n-input type="textarea" v-model:value="Data.Content2"/>
                </n-form-item>
                <n-form-item label="內文3">
                    <n-input type="textarea" v-model:value="Data.Content3"/>
                </n-form-item>
                <n-form-item label="內文4">
                    <n-input type="textarea" v-model:value="Data.Content4"/>
                </n-form-item>
                <n-form-item label="內文5">
                    <n-input type="textarea" v-model:value="Data.Content5"/>
                </n-form-item>
                <n-form-item label="內文6">
                    <n-input type="textarea" v-model:value="Data.Content6"/>
                </n-form-item>
                <n-form-item label="內文7">
                    <n-input type="textarea" v-model:value="Data.Content7"/>
                </n-form-item>

                <n-form-item label="狀態">
                    <n-switch checked-value="Y" unchecked-value="N" v-model:value="Data.Status"/>
                </n-form-item>
                <n-form-item label="排序">
                    <n-input-number type="text" v-model:value="Data.Seq"/>
                </n-form-item>
                <n-button @click="handleSubmit">送出</n-button>
            </n-form>
        </n-card>

    </n-page-header>
</template>
