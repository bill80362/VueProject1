<script setup>
import { useMessage } from "naive-ui";
import {computed, ref} from "vue";

defineProps({
  TableHeader: {
    type: Array,
    required: true
  },
  TableContent: {
    type: Array,
    required: true
  },
})

const page = ref(1)
const pageTotal = ref(10)

</script>

<template>
  <n-page-header title="商品分類管理" subtitle="數量:20">
    <template #extra>
      <n-space>
        <n-button type="success">新增</n-button>
      </n-space>
    </template>

    <n-grid :cols="1">
      <n-gi>
        <n-table :bordered="false" :single-line="false">
          <thead>
          <tr>
            <th v-for="(item,key) in TableHeader">{{ item }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row,key) in TableContent">
            <td v-for="(item,key2) in row">{{item}}</td>
          </tr>
          </tbody>
        </n-table>
      </n-gi>
    </n-grid>

    <template #footer>
      <n-pagination
          v-model:page="page"
          :page-count="pageTotal"
          show-quick-jumper
          show-size-picker
      />
    </template>

  </n-page-header>
</template>
