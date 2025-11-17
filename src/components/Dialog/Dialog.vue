<template>
  <div
      v-if="visible"
      class="overlay"
      :class="[
      { 'fade-out': isClosing },
      { 'overlay-blur': backgroundBlur },
      { 'overlay-dark': backgroundDark }
    ]"
      @click="handleOverlayClick"
  >
    <div
        class="dialog"
        :class="{ 'fade-out': isClosing }"
        @click.stop
    >
      <!-- 标题 -->
      <header v-if="title" class="dialog-header">
        <h3>{{ title }}</h3>
        <button v-if="showClose" class="close" @click="handleClose">×</button>
      </header>

      <!-- 内容 -->
      <div class="dialog-body">
        <slot />
      </div>

      <!-- 底部按钮 -->
      <footer class="dialog-footer">
        <button
            v-if="doubleButton"
            class="dialog-btn cancel"
            @click="handleCancel"
        >
          {{ cancelText || '取消' }}
        </button>
        <button
            class="dialog-btn confirm"
            @click="handleConfirm"
        >
          {{ confirmText || '确认' }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: boolean
  title?: string
  showClose?: boolean
  backgroundBlur?: boolean
  backgroundDark?: boolean
  doubleButton?: boolean
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'close'): void
  (e: 'overlay'): void
}>()

const visible = ref(false)
const isClosing = ref(false)

watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        visible.value = true
        isClosing.value = false
      } else if (visible.value) {
        startCloseAnimation()
      }
    },
    { immediate: true }
)

function startCloseAnimation() {
  isClosing.value = true
  setTimeout(() => {
    visible.value = false
    isClosing.value = false
  }, 280)
}

function closeWith(trigger?: 'close' | 'cancel' | 'overlay' | 'confirm') {
  if (trigger === 'confirm') emit('confirm')
  if (trigger === 'close' || trigger === 'cancel') emit('close')
  if (trigger === 'overlay') emit('overlay')
  emit('update:modelValue', false)
}

function handleClose() {
  closeWith('close')
}
function handleCancel() {
  closeWith('cancel')
}
function handleConfirm() {
  closeWith('confirm')
}
function handleOverlayClick() {
  closeWith('overlay')
}
</script>

<style scoped>
/* === 背景层 === */
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
  z-index: 1000;
}
.overlay-blur {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.overlay-dark {
  background: rgba(0, 0, 0, 0.35);
}
.overlay.fade-out {
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* === 弹窗主体 === */
.dialog {
  min-width: 320px;
  max-width: 80vw;
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  color: #222;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transform: scale(0.95);
  opacity: 0;
  animation: dialogIn 0.3s ease forwards;
}
.dialog.fade-out {
  animation: dialogOut 0.25s ease forwards;
}

/* === 标题栏 === */
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.dialog-header h3 {
  font-size: 18px;
  margin: 0;
}
.close {
  background: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.close:hover {
  opacity: 1;
}

/* === 内容区域 === */
.dialog-body {
  font-size: 15px;
  line-height: 1.6;
  overflow-wrap: break-word;
}

/* === 底部按钮区域 === */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

/* === 按钮 === */
.dialog-btn {
  min-width: 90px;
  padding: 8px 20px;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}
.dialog-btn.confirm {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}
.dialog-btn.confirm:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.dialog-btn.cancel {
  background: #f5f5f5;
  color: #333;
  border-color: #dcdfe6;
}
.dialog-btn.cancel:hover {
  background: #ebebeb;
  border-color: #c6c9cf;
}

/* === 动画 === */
@keyframes dialogIn {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes dialogOut {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.9); }
}
</style>
