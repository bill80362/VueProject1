import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import axios from "axios";

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const cardList = ref()
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  //
  const fetchApiData = async () => {
    try{
      const res = await axios.get("https://api.krace.com.tw/goods");
      cardList.value = res.data;
    }catch (error){
      //error handle
    }

  }

  return { count, doubleCount, increment , cardList , fetchApiData }
})
