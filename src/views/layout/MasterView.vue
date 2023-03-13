<script setup>
import Nav from "../include/Nav.vue";
import Header from "../include/Header.vue";
import Footer from "../include/Footer.vue";
</script>



<template>
  <n-space vertical>
    <n-layout>
      <Header />
      <n-layout has-sider>
        <n-layout-sider
            bordered
            show-trigger
            collapse-mode="width"
            :native-scrollbar="false"
        >
          <Nav mode="vertical" />
        </n-layout-sider>
        <n-layout style="padding: 20px;">
          <RouterView />
        </n-layout>
      </n-layout>
      <Footer />
    </n-layout>
  </n-space>
</template>

<style scoped>

</style>
