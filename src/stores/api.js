import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import axios from "axios";
import router from "../router";

const ApiMasterUrl = import.meta.env.VITE_BACKEND_HOST;

export const useDataApiStore = defineStore('api', () => {
  //Login
  const Token = ref("")
  const isLogin = computed(() => {
    return Token.value.length>0;
  })
  const login = async (loginAccount,loginPassword) => {
    try{
      const res = await axios.post(ApiMasterUrl + "/admin/login",{
        "Account":loginAccount,
        "Password":loginPassword,
      },{
        responseType: 'json',
      });
      Token.value = res.data.data.Token;
      //登入成功，導入首頁
      await router.push({name: "Home"})
    }catch (error){
      //error handle
    }
  }
  //Goods
  const GoodsList = ref([]);
  const getGoodsList = computed(async ()=>{
    //login
    // isLogin || await login();
    //get data
    await apiGoodsList();
    //
    return GoodsList.value
  })
  const apiGoodsList = async () => {
    try {
      const res = await axios.get(ApiMasterUrl + "/admin/goods",{
        responseType: 'json',
        "headers" : {
          "Authorization" : "Bearer "+Token.value,
        }
      });
      GoodsList.value = res.data.data;
    }catch (error){
      //error handle
    }
  }

  return {
    isLogin,
    login,
    GoodsList,
    getGoodsList,
    apiGoodsList,
  }
})
