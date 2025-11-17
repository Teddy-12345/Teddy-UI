<template>
  <div
      class="t-message"
      :class="[`t-message--${type}`]"
      :style="{ top: offset + 'px' }"
      ref="el"
  >
    <div class="t-message__icon" v-if="showIcon">
      <slot name="icon">
        {{ icon }}
      </slot>
    </div>

    <div class="t-message__text">
      <slot>{{ text }}</slot>
    </div>

    <div
        v-if="type !== 'loading'"
        class="t-message__close"
        @click="close"
    >×</div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  id: number
  text?: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'loading'
  duration?: number
  offset: number
}>()

const emit = defineEmits(['close'])

const el = ref<HTMLElement | null>(null)

const type = props.type || 'info'
const duration = props.duration ?? 2500

/* 图标定义（可 slot 覆盖） */
const iconMap: Record<string, string> = {
  info: 'ℹ️',
  success: '✓',
  warning: '⚠️',
  error: '✖',
  loading: '⏳'
}
const icon = iconMap[type]
const showIcon = type !== 'loading'

/* 播放淡入淡出动画 */
onMounted(() => {
  el.value!.classList.add('is-show')

  if (duration > 0) {
    setTimeout(() => close(), duration)
  }
})

function close() {
  const dom = el.value!
  dom.classList.remove('is-show')
  dom.classList.add('is-hide')
  setTimeout(() => emit('close', props.id), 200)
}
</script>

<style scoped>
.t-message {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  min-width: 220px;
  max-width: 400px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-radius: 14px;
  color: #fff;
  font-size: 15px;
  opacity: 0;
  pointer-events: auto;
  transition: opacity 0.25s ease, transform 0.25s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  gap: 8px;
}

/* 展示动画 */
.t-message.is-show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.t-message.is-hide {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

/* 类型样式 */
.t-message--info {
  background: rgba(64,158,255,0.35);
}
.t-message--success {
  background: rgba(52,199,89,0.35);
}
.t-message--warning {
  background: rgba(255,214,10,0.35);
  color: #222;
}
.t-message--error {
  background: rgba(255,80,80,0.35);
}

.t-message__icon {
  font-size: 18px;
}

.t-message__close {
  cursor: pointer;
  margin-left: auto;
  opacity: 0.8;
  transition: opacity .2s;
}
.t-message__close:hover {
  opacity: 1;
}
</style>
