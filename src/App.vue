<template>
  <BackGround />
  <MainLayout />
</template>

<script setup lang="ts">
import MainLayout from './layout/MainLayout.vue'
import BackGround from './layout/BackGround.vue'
</script>

<style scoped>
BackGround {
  z-index: -999;
}

MainLayout {
  z-index: 999;
}
</style>