<template>
  <div
      class="t-float-window"
      :class="[
      glass && 'is-glass',
      hoverable && 'is-hoverable',
      clickable && 'is-clickable'
    ]"
      :style="panelStyle"
      @click="handleClick"
  >
    <!-- 标题 -->
    <div class="t-float-window__header" v-if="title || $slots.title">
      <slot name="title">
        <span class="t-float-window__title-text">{{ title }}</span>
      </slot>
    </div>

    <!-- 内容 -->
    <div class="t-float-window__body">
      <slot>
        默认内容
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

const props = defineProps<{
  /** 宽度，默认 260px，可传 300 / "320px" / "50%" */
  width?: number | string
  /** 高度，默认 160px，可传 180 / "200px" / "auto" */
  height?: number | string
  /** 背景色（非玻璃时生效），默认 #fff */
  color?: string
  /** 是否玻璃磨砂 */
  glass?: boolean
  /** 是否启用 hover 高亮效果 */
  hoverable?: boolean
  /** 是否可点击 */
  clickable?: boolean
  /** 阴影颜色，默认 rgba(0,0,0,0.25) */
  shadowColor?: string
  /** 标题文本（也可以用 slot: title） */
  title?: string
}>()

const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

const panelStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}

  // 默认大小
  const w = props.width ?? 260
  const h = props.height ?? 160

  style.width = typeof w === 'number' ? `${w}px` : w
  style.height = typeof h === 'number' ? `${h}px` : h

  // 背景：玻璃模式用透明白，普通模式用 color
  if (props.glass) {
    style.background = 'rgba(255, 255, 255, 0.16)'
  } else {
    style.background = props.color || '#ffffff'
  }

  // 阴影
  const shadow = props.shadowColor || 'rgba(0, 0, 0, 0.25)'
  style.boxShadow = `0 10px 25px ${shadow}`

  return style
})

function handleClick(evt: MouseEvent) {
  if (!props.clickable) return
  emit('click', evt)
}
</script>

<style scoped>
.t-float-window {
  position: relative;
  box-sizing: border-box;
  border-radius: 18px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;

  color: #111;

  transition:
      transform 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease,
      border-color 0.22s ease,
      opacity 0.22s ease;
}

.t-float-window.is-glass {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.45);
}

.t-float-window.is-hoverable:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.30);
  background: rgba(255, 255, 255, 0.24);
}

.t-float-window.is-clickable {
  cursor: pointer;
}

.t-float-window__header {
  margin-bottom: 8px;
}

.t-float-window__title-text {
  font-size: 15px;
  font-weight: 600;
  color: inherit;
}

.t-float-window__body {
  flex: 1;
  font-size: 13px;
  line-height: 1.6;
  color: inherit;
  opacity: 0.9;
}
</style>
