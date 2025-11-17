<template>
  <div class="t-tab">
    <div class="t-tab__nav">
      <div
          v-for="pane in panes"
          :key="pane.name"
          class="t-tab__item"
          :class="{ 'is-active': pane.name === currentName }"
          @click="activate(pane.name)"
          :ref="el => pane.el = el"
      >
        {{ pane.label }}
      </div>

      <div class="t-tab__bar" :style="barStyle"></div>
    </div>

    <div class="t-tab__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, provide, watch, nextTick, onMounted } from 'vue'

interface Pane {
  name: string
  label: string
  el?: HTMLElement
}

const props = defineProps<{
  modelValue?: string
  default?: string
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const panes = reactive<Pane[]>([])
const currentName = ref(props.modelValue || props.default)

function registerPane(pane: Pane) {
  panes.push(pane)
  if (!currentName.value) currentName.value = pane.name
}

function activate(name: string) {
  if (currentName.value === name) return
  currentName.value = name
  emit('update:modelValue', name)
  emit('change', name)
}

provide('tabRegister', registerPane)
provide('tabActive', currentName)

const barStyle = ref({})

function updateBar() {
  nextTick(() => {
    const active = panes.find(p => p.name === currentName.value)
    if (!active || !active.el) return
    barStyle.value = {
      width: active.el.offsetWidth + 'px',
      transform: `translateX(${active.el.offsetLeft}px)`
    }
  })
}

watch(currentName, updateBar)
onMounted(updateBar)
</script>

<style scoped>
.t-tab {
  width: 100%;
  color: inherit;
  user-select: none;
}

.t-tab__nav {
  position: relative;
  display: flex;
  gap: 24px;
  padding: 8px 0;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.t-tab__item {
  padding: 8px 14px;
  cursor: pointer;
  color: rgba(3, 10, 18, 0.47);
  transition: color .25s ease;
  border-radius: 10px;
}

.t-tab__item.is-active {
  color: #030a12;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-radius: 10px;
  padding: 8px 14px;
  box-shadow:
      0 4px 12px rgba(0,0,0,0.15),
      inset 0 0 0 0 rgba(255,255,255,0.5),
      0 0 0 1px rgba(255,255,255,0.35);
  transition: background .25s ease;
}

.t-tab__bar {
  position: absolute;
  bottom: 0;
  height: 3px;
  border-radius: 6px;
  background: #409eff;
  transition: all .3s cubic-bezier(0.25, 0.9, 0.35, 1);
}

.t-tab__content {
  padding: 10px 0;
}
</style>
