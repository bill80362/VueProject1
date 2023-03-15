import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

import axios from "axios";
import router from "../router";

const ApiMasterUrl = import.meta.env.VITE_BACKEND_HOST;

export const useDataApiStore = defineStore('api', () => {
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
        if(data.ColorID===undefined){
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

    return {
        //Login
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
    }
})
