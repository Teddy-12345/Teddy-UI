<template>
  <header class="nav-bar">
    <div class="nav-left" @click="goHome">
      <img src="/Teddy_1.png" class="logo" alt="logo" />
      <span class="logo-text">Teddy-UI</span>
      <span class="version">测试版</span>
    </div>
    <nav class="nav-right">
      <span class="nav-btn" @click="goHome">Home</span>
      <span class="nav-btn" @click="goComponent">Component</span>
      <a class="nav-btn" href="https://github.com/Teddy-12345/Teddy-UI" target="_blank">Github</a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goComponent = () => {
  router.push('/components')
}
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 1000;
  user-select: none;
}

.logo {
  height: 28px;
  width: 28px;
  margin-right: 8px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
}

.logo-text {
  font-weight: 600;
  font-size: 18px;
  color: #409eff;
  margin-right: 8px;
}

.version {
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;
  font-size: 12px;
  border-radius: 8px;
  padding: 2px 6px;
}

.nav-left {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-btn {
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

.nav-btn:hover {
  color: #409eff;
}
</style>
