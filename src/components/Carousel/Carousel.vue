<template>
  <div class="t-carousel" @mouseenter="pause" @mouseleave="resume">
    <!-- 轨道 -->
    <div class="t-carousel-track" :style="trackStyle">
      <div
          v-for="(item, index) in items"
          :key="index"
          class="t-carousel-item"
      >
        <slot :item="item" :index="index" />
      </div>
    </div>

    <!-- 左按钮 -->
    <button class="t-carousel-btn left" @click="prev">
      ‹
    </button>

    <!-- 右按钮 -->
    <button class="t-carousel-btn right" @click="next">
      ›
    </button>

    <!-- 指示点 -->
    <div class="t-carousel-indicators">
      <span
          v-for="(item, index) in items"
          :key="index"
          class="dot"
          :class="{ active: index === current }"
          @click="go(index)"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  items: any[]                  // 轮播数据
  interval?: number             // 自动切换间隔
  duration?: number             // 动画时长
}>()

const current = ref(0)
let timer: any = null

const interval = props.interval ?? 2800
const duration = props.duration ?? 450

const trackStyle = computed(() => ({
  transform: `translateX(-${current.value * 100}%)`,
  transition: `transform ${duration}ms cubic-bezier(0.25, 0.6, 0.25, 1)`
}))

function next() {
  current.value = (current.value + 1) % props.items.length
}
function prev() {
  current.value =
      (current.value - 1 + props.items.length) % props.items.length
}
function go(i: number) {
  current.value = i
}

function play() {
  timer = setInterval(next, interval)
}
function pause() {
  clearInterval(timer)
}
function resume() {
  play()
}

onMounted(play)
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.t-carousel {
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 16px;
  overflow: hidden;

  /* 玻璃拟物背景 */
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px) saturate(180%);
  -webkit-backdrop-filter: blur(14px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow:
      0 6px 20px rgba(0, 0, 0, 0.15),
      inset 0 0 0 rgba(255, 255, 255, 0.2);
}

.t-carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
}

.t-carousel-item {
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.t-carousel-item:nth-child(n + 1) {
  transform: scale(1);
}

/* 按钮 */
.t-carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.35);
  cursor: pointer;
  color: #fff;
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  transition: all 0.25s ease;

}
.t-carousel-btn:hover {
  background: rgba(255,255,255,0.35);
  transform: translateY(-50%) scale(1.1);
}
.t-carousel-btn.left { left: 12px; }
.t-carousel-btn.right { right: 12px; }

/* 指示点 */
.t-carousel-indicators {
  position: absolute;
  bottom: 14px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 100px;
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(12px);
  transition: 0.25s;
}
.dot.active {
  width: 18px;
  background: rgba(255,255,255,0.9);
}
</style>
