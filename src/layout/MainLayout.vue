<template>
  <div class="layout">
    <Header />

    <div class="body">
      <Sidebar />

      <main class="content">
        <router-view @update-toc="setToc" />
      </main>

      <Toc v-if="toc.length" :items="toc" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Toc from './Toc.vue'
import { ref } from 'vue'

const toc = ref([])

function setToc(list: any[]) {
  toc.value = list
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.content {
  flex: 1;
  padding: 40px;
  margin-top: 20px;
  padding-left: 300px;
  transition: all 0.35s ease;
}

@media (max-width: 1000px) {
  .content {
    padding-left: 0;
  }
}
</style>
