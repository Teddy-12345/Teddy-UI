<template>
  <button id="backTop" :class="{ show: showTopBtn }" @click="scrollTop">↑</button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showTopBtn = ref(false)
let scrollEl: HTMLElement | null = null

function onScroll() {
  if (!scrollEl) return
  showTopBtn.value = scrollEl.scrollTop > 200
}

const showTopBtn = ref(false)

function onScroll() {
  showTopBtn.value = window.scrollY > 200
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

</script>

<style scoped>
#backTop {
  position: fixed;
  right: 40px;
  bottom: 60px;
  padding: 12px 16px;
  font-size: 20px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity .25s ease;
  z-index: 9999;
}
#backTop.show {
  opacity: 1;
}
</style>
