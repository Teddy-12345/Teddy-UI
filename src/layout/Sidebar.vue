<template>
  <aside class="sidebar" :class="{ hide: isSmallScreen }">
    <div class="group-title">组件总览</div>
    <router-link class="item" to="/overview">Overview</router-link>

    <div class="group-title">基础组件</div>
    <router-link class="item" to="/button">Button 按钮</router-link>
    <router-link class="item" to="/input">Input 输入框</router-link>
    <router-link class="item" to="/switch">Switch 开关</router-link>
    <router-link class="item" to="/tab">Tab 标签页</router-link>

    <div class="group-title">反馈组件</div>
    <router-link class="item" to="/dialog">Dialog 弹窗</router-link>
    <router-link class="item" to="/message">Message 消息提示</router-link>
    <router-link class="item" to="/window">Window 悬浮窗</router-link>

    <div class="group-title">展示组件</div>
    <router-link class="item" to="/tree">Tree 树形结构</router-link>
    <router-link class="item" to="/carousel">Carousel 轮播图</router-link>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

defineOptions({
  name: "Sidebar",
  inheritAttrs: false
})

const isSmallScreen = ref(window.innerWidth < 1000)

let ticking = false
function checkWidth() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    isSmallScreen.value = window.innerWidth < 1000
    ticking = false
  })
}

onMounted(() => {
  window.addEventListener("resize", checkWidth, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener("resize", checkWidth)
})
</script>

<style scoped>
.sidebar {
  width: 260px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;

  padding: 24px 16px;
  padding-top: 88px;

  display: flex;
  flex-direction: column;

  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(16px);

  border-right: 1px solid rgba(0,0,0,0.08);

  transition: transform 0.35s ease;
  user-select: none;
}

.hide {
  transform: translateX(-100%);
}

.group-title {
  margin: 26px 0 10px;
  font-size: 15px;
  font-weight: 700;
  color: #333;
  padding-left: 6px;
}

.item {
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  color: #444;
  text-decoration: none;
  display: block;
  transition: 0.2s;
}

.item:hover {
  background: rgba(64, 158, 255, 0.12);
  color: #409eff;
}

.item.router-link-active {
  background: rgba(64,158,255,0.18);
  color: #409eff;
  font-weight: 400;
}
</style>
