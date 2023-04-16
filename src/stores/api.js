import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

import axios from "axios";
import router from "../router";



export const useDataApiStore = defineStore('api', () => {
    const ApiMasterUrl = import.meta.env.VITE_BACKEND_HOST;
    //FroalaEditorConfig
    const FroalaEditorConfig = ref({
        imageUploadURL: ApiMasterUrl+"/editor/upload",
        //上傳圖片，內含資料
        imageUploadParams: {
            Type: 'FullPath',//取得圖片完整路徑
        },
        //限制上傳檔案
        imageAllowedTypes: ['jpeg', 'jpg', 'png','gif','webp'],
    });
    //Login
    const Token = ref("")
    const isLogin = computed(() => {
        return Token.value.length > 0;
    })
    const login = async (loginAccount, loginPassword) => {
        try {
            const res = await axios.post(ApiMasterUrl + "/admin/login", {
                "Account": loginAccount,
                "Password": loginPassword,
            }, {
                responseType: 'json',
            });
            Token.value = res.data.data.Token;
            //登入成功，導入首頁
            await router.push({name: "Home"})
        } catch (error) {
            //error handle
        }
    }
    //Goods
    const GoodsList = ref([]);
    const getGoodsList = computed(async () => {
        //get data
        await apiGoodsList();
        //
        return GoodsList.value
    })
    const apiGoodsList = async () => {
        try {
            const res = await axios.get(ApiMasterUrl + "/admin/goods", {
                responseType: 'json',
                "headers": {
                    "Authorization": "Bearer " + Token.value,
                }
            });
            GoodsList.value = res.data.data;
        } catch (error) {
            //error handle
        }
    }
    //Color
    const ColorList = ref([]);
    const apiColorList = async () => {
        try {
            const res = await axios.get(ApiMasterUrl + "/admin/color", {
                responseType: 'json',
                "headers": {
                    "Authorization": "Bearer " + Token.value,
                }
            });
            ColorList.value = res.data.data;
        } catch (error) {
            //error handle
        }
    }
    const apiColorUpdateCreate = async (data) => {
        //config
        let axios_config = {
            responseType: 'json',
            "headers": {
                "Authorization": "Bearer " + Token.value,
            }
        }
        //
        let res = [];
        if(data.ID==="0"){
            try {
                res = await axios.put(ApiMasterUrl + "/admin/color", data, axios_config);
            } catch (error) {}
        }else{
            try {
                res = await axios.patch(ApiMasterUrl + "/admin/color", data, axios_config);
            } catch (error) {}
        }
        //儲存
        ColorList.value = res.data.data;
    }
    //Size
    const SizeList = ref([]);
    const apiSizeList = async () => {
        try {
            const res = await axios.get(ApiMasterUrl + "/admin/size", {
                responseType: 'json',
                "headers": {
                    "Authorization": "Bearer " + Token.value,
                }
            });
            SizeList.value = res.data.data;
        } catch (error) {
            //error handle
        }
    }
    const apiSizeUpdateCreate = async (data) => {
        //config
        let axios_config = {
            responseType: 'json',
            "headers": {
                "Authorization": "Bearer " + Token.value,
            }
        }
        //
        let res = [];
        if(data.ID==="0"){
            try {
                res = await axios.put(ApiMasterUrl + "/admin/size", data, axios_config);
            } catch (error) {}
        }else{
            try {
                res = await axios.patch(ApiMasterUrl + "/admin/size", data, axios_config);
            } catch (error) {}
        }
        //儲存
        SizeList.value = res.data.data;
    }
    //MenuCategory
    const MenuCategoryList = ref([]);
    const apiMenuCategoryList = async () => {
        try {
            const res = await axios.get(ApiMasterUrl + "/admin/menu/category", {
                responseType: 'json',
                "headers": {
                    "Authorization": "Bearer " + Token.value,
                }
            });
            MenuCategoryList.value = res.data.data;
        } catch (error) {
            //error handle
        }
    }
    const apiMenuCategoryUpdateCreate = async (data) => {
        //config
        let axios_config = {
            responseType: 'json',
            "headers": {
                "Authorization": "Bearer " + Token.value,
            }
        }
        //
        let res = [];
        if(data.ID==="0"){
            try {
                res = await axios.put(ApiMasterUrl + "/admin/menu/category", data, axios_config);
            } catch (error) {}
        }else{
            try {
                res = await axios.patch(ApiMasterUrl + "/admin/menu/category", data, axios_config);
            } catch (error) {}
        }
        //儲存
        MenuCategoryList.value = res.data.data;
    }
    //Menu
    const MenuList = ref([]);
    const apiMenuList = async () => {
        try {
            const res = await axios.get(ApiMasterUrl + "/admin/menu", {
                responseType: 'json',
                "headers": {
                    "Authorization": "Bearer " + Token.value,
                }
            });
            MenuList.value = res.data.data;
        } catch (error) {
            //error handle
        }
    }
    const apiMenuUpdateCreate = async (data) => {
        //config
        let axios_config = {
            responseType: 'json',
            "headers": {
                "Authorization": "Bearer " + Token.value,
            }
        }
        //
        let res = [];
        if(data.ID==="0"){
            try {
                res = await axios.put(ApiMasterUrl + "/admin/menu", data, axios_config);
            } catch (error) {}
        }else{
            try {
                res = await axios.patch(ApiMasterUrl + "/admin/menu", data, axios_config);
            } catch (error) {}
        }
        //儲存
        MenuList.value = res.data.data;
    }
    //NewsCategory
    const NewsCategoryList = ref([]);
    const apiNewsCategoryList = async () => {
        try {
            const res = await axios.get(ApiMasterUrl + "/admin/news/category", {
                responseType: 'json',
                "headers": {
                    "Authorization": "Bearer " + Token.value,
                }
            });
            NewsCategoryList.value = res.data.data;
        } catch (error) {
            //error handle
        }
    }
    const apiNewsCategoryUpdateCreate = async (data) => {
        //config
        let axios_config = {
            responseType: 'json',
            "headers": {
                "Authorization": "Bearer " + Token.value,
            }
        }
        //
        let res = [];
        if(data.ID==="0"){
            try {
                res = await axios.put(ApiMasterUrl + "/admin/news/category", data, axios_config);
            } catch (error) {}
        }else{
            try {
                res = await axios.patch(ApiMasterUrl + "/admin/news/category", data, axios_config);
            } catch (error) {}
        }
        //儲存
        NewsCategoryList.value = res.data.data;
    }
    //News
    const NewsList = ref([]);
    const apiNewsList = async () => {
        try {
            const res = await axios.get(ApiMasterUrl + "/admin/news", {
                responseType: 'json',
                "headers": {
                    "Authorization": "Bearer " + Token.value,
                }
            });
            NewsList.value = res.data.data;
        } catch (error) {
            //error handle
        }
    }
    const apiNewsUpdateCreate = async (data) => {
        //config
        let axios_config = {
            responseType: 'json',
            "headers": {
                "Authorization": "Bearer " + Token.value,
            }
        }
        //
        let res = [];
        if(data.ID==="0"){
            try {
                res = await axios.put(ApiMasterUrl + "/admin/news", data, axios_config);
            } catch (error) {}
        }else{
            try {
                res = await axios.patch(ApiMasterUrl + "/admin/news", data, axios_config);
            } catch (error) {}
        }
        //儲存
        NewsList.value = res.data.data;
    }

    return {
        //
        FroalaEditorConfig,
        //
        ApiMasterUrl,
        //Login
        Token,
        isLogin,
        login,
        //Goods
        GoodsList,
        getGoodsList,
        apiGoodsList,
        //Color
        ColorList,
        apiColorList,
        apiColorUpdateCreate,
        //Size
        SizeList,
        apiSizeList,
        apiSizeUpdateCreate,
        //MenuCategory
        MenuCategoryList,
        apiMenuCategoryList,
        apiMenuCategoryUpdateCreate,
        //Menu
        MenuList,
        apiMenuList,
        apiMenuUpdateCreate,
        //NewsCategory
        NewsCategoryList,
        apiNewsCategoryList,
        apiNewsCategoryUpdateCreate,
        //News
        NewsList,
        apiNewsList,
        apiNewsUpdateCreate,
    }
})
