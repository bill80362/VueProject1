<script setup>
import {useDataApiStore} from "../stores/api";
import {ref , onMounted} from "vue";
const DataApi = useDataApiStore();

const formValue = ref({
  "Account": "",
  "Password": "",
})
</script>

<template>
    <n-card title="登入">
      <n-form :model="formValue">
        <n-form-item label="帳號">
          <n-input v-model:value="formValue.Account" />
        </n-form-item>
        <n-form-item label="密碼">
          <n-input v-model:value="formValue.Password" type="password"/>
        </n-form-item>
        <n-button @click="DataApi.login(formValue.Account,formValue.Password)">
          登入
        </n-button>
      </n-form>
    </n-card>
</template>
