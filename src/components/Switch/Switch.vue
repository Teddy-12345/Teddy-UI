<template>
  <div
      class="switch"
      :class="[
      `switch--${colorClass}`,
      { 'is-on': isOn, 'is-disabled': disabled }
    ]"
      v-bind="$attrs"
      @click="toggle"
  >
    <div class="switch-handle">
      <span v-if="logo" class="switch-logo">{{ isOn ? 'I' : 'O' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: boolean
  color?: 'black' | 'gray' | 'green' | 'red' | 'yellow' | 'white'
  disabled?: boolean
  logo?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const isOn = computed(() => props.modelValue)
const colorClass = computed(() => props.color || 'green')

function toggle() {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style scoped>
.switch {
  position: relative;
  width: 52px;
  height: 30px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: inset 0 0 3px rgba(0,0,0,0.2);
}

.switch-handle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.switch-logo {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  user-select: none;
}

/* 选中状态 */
.is-on .switch-handle {
  left: calc(100% - 28px);
}

/* 禁用状态 */
.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* === 不同颜色状态 === */
.switch--black.is-on {
  background: #1a1a1a;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.switch--gray.is-on {
  background: #999;
  box-shadow: 0 0 10px rgba(150,150,150,0.5);
}

.switch--green.is-on {
  background: #4cd964;
  box-shadow: 0 0 10px rgba(76,217,100,0.5);
}

.switch--red.is-on {
  background: #ff3b30;
  box-shadow: 0 0 10px rgba(255,59,48,0.5);
}

.switch--yellow.is-on {
  background: #ffcc00;
  box-shadow: 0 0 10px rgba(255,204,0,0.5);
}

/* 白色磨砂玻璃模式 */
.switch--white.is-on {
  background: rgba(255,255,255,0.3);
  border: 1px solid rgba(255,255,255,0.5);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* hover 轻微亮度 */
.switch:not(.is-disabled):hover {
  box-shadow: 0 0 12px rgba(255,255,255,0.25);
  transition: box-shadow 0.3s ease, background 0.3s ease;
  filter: brightness(1.3);
}
</style>
