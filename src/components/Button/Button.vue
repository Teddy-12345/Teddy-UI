<template>
  <button
      class="t-button"
      :class="[
      `t-button--${colorClass}`,
      type === 'select' && isSelected ? 'is-selected' : '',
      { 'is-circle': circle }
    ]"
      :style="buttonStyle"
      v-bind="$attrs"
      @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  color?: 'red' | 'yellow' | 'blue' | 'green' | 'white'
  type?: 'click' | 'select'
  modelValue?: boolean
  circle?: boolean
  diameter?: number | string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'click', event: MouseEvent & { selected?: boolean }): void
}>()

// 非受控模式（没用 v-model 时）内部自己存选中态
const innerSelected = ref(false)

const isControlled = computed(() => props.modelValue !== undefined)

const isSelected = computed(() => {
  if (props.type !== 'select') return false
  return isControlled.value ? !!props.modelValue : innerSelected.value
})

const colorClass = computed(() => props.color || 'white')

function onClick(event: MouseEvent) {
  if (props.type === 'select') {
    const next = !isSelected.value

    if (isControlled.value) {
      emit('update:modelValue', next)
    } else {
      innerSelected.value = next
    }

    emit('click', Object.assign(event, { selected: next }))
  } else {
    emit('click', event)
  }
}

const buttonStyle = computed(() => {
  if (props.circle) {
    const d = props.diameter ?? 40
    return {
      width: `${d}px`,
      height: `${d}px`,
      borderRadius: '50%',
      padding: 0
    }
  }
  return {}
})
</script>

<style scoped>
.t-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px) saturate(180%);
  -webkit-backdrop-filter: blur(14px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow:
      inset 0 0 0 0 rgba(255,255,255,0.3),
      0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
}

/* hover */
.t-button:hover {
  background: rgba(255, 255, 255, 0.25);
  box-shadow:
      inset 0 0 0 0 rgba(255,255,255,0.4),
      0 6px 16px rgba(0, 0, 0, 0.25);
  transform: translateY(-1px);
}

/* active */
.t-button:active {
  background: rgba(255, 255, 255, 0.18);
  box-shadow:
      inset 0 1px 4px rgba(0, 0, 0, 0.25),
      0 2px 4px rgba(0, 0, 0, 0.2);
  transform: scale(0.97);
}

.t-button--blue {
  background: rgba(64, 156, 255, 0.25);
  border: 1px solid rgba(120, 190, 255, 0.3);
  box-shadow:
      0 4px 10px rgba(64, 156, 255, 0.2);
}
.t-button--blue:hover {
  background: rgba(64, 156, 255, 0.35);
}
.t-button--blue:active {
  background: rgba(64, 156, 255, 0.25);
}

.t-button--red {
  background: rgba(255, 80, 80, 0.25);
  border: 1px solid rgba(255, 140, 140, 0.3);
  box-shadow:
      0 4px 10px rgba(255, 80, 80, 0.25);
}
.t-button--red:hover {
  background: rgba(255, 80, 80, 0.35);
}
.t-button--red:active {
  background: rgba(255, 80, 80, 0.25);
}

.t-button--green {
  background: rgba(52, 199, 89, 0.25);
  border: 1px solid rgba(120, 255, 160, 0.3);
  box-shadow:
      0 4px 10px rgba(52, 199, 89, 0.25);
}
.t-button--green:hover {
  background: rgba(52, 199, 89, 0.35);
}
.t-button--green:active {
  background: rgba(52, 199, 89, 0.25);
}

.t-button--yellow {
  background: rgba(255, 214, 10, 0.25);
  border: 1px solid rgba(255, 240, 120, 0.3);
  box-shadow:
      0 4px 10px rgba(255, 214, 10, 0.25);
  color: #ffffff;
}
.t-button--yellow:hover {
  background: rgba(255, 214, 10, 0.35);
}
.t-button--yellow:active {
  background: rgba(255, 214, 10, 0.25);
}

.t-button--white {
  background: rgba(255, 255, 255, 0.35);
  color: #222;
  border: 1px solid rgb(191, 191, 191);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* 圆钮 */
.is-circle {
  border-radius: 50%;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* select  */
.is-selected {
  animation: selectPress 0.35s cubic-bezier(0.25, 0.6, 0.25, 1);
  outline: 2px solid rgba(255, 255, 255, 0.6);
  transform: scale(0.94); /* 比你原来的 0.96 更明显一点 */
  box-shadow:
      inset 0 0 10px rgba(255, 255, 255, 0.5),
      0 0 12px rgba(255, 255, 255, 0.35);
}

/* 选中动画 */
@keyframes selectPress {
  0% {
    transform: scale(1);
    box-shadow:
        inset 0 0 0 rgba(255, 255, 255, 0),
        0 0 0 rgba(255, 255, 255, 0);
  }

  35% {
    transform: scale(0.90); /* 向内按下更明显 */
    box-shadow:
        inset 0 0 18px rgba(255, 255, 255, 0.55),
        0 0 20px rgba(255, 255, 255, 0.45);
  }

  65% {
    transform: scale(0.97);
    box-shadow:
        inset 0 0 6px rgba(255, 255, 255, 0.35),
        0 0 10px rgba(255, 255, 255, 0.25);
  }

  100% {
    transform: scale(0.94);
    box-shadow:
        inset 0 0 10px rgba(255, 255, 255, 0.5),
        0 0 12px rgba(255, 255, 255, 0.35);
  }
}

</style>
