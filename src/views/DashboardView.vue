<script setup>
import {useCounterStore} from '../stores/counter.js';
import {ref} from "vue";
import {useDataApiStore} from "../stores/api";

const DataApi = useDataApiStore();

</script>

<template>
  <main>
    <n-grid :cols="2">
      <n-gi>
        <n-statistic label="本月新加入會員" value="20" />
      </n-gi>
      <n-gi>
        <n-statistic label="總會員" value="20" />
      </n-gi>
    </n-grid>
    <n-grid :cols="2">
      <n-gi>
        <n-statistic label="本月訂單筆數" value="22" />
      </n-gi>
      <n-gi>
        <n-statistic label="本月業績" value="83" />
      </n-gi>
    </n-grid>
  </main>
</template>
