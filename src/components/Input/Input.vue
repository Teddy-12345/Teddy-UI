<template>
  <div class="input-wrapper">
    <span v-if="labelText" class="input-label">{{ labelText }}</span>

    <input
        v-bind="$attrs"
        class="input"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
    />

    <button
        v-if="clearable && modelValue"
        class="input-clear"
        @click="clearInput"
    >
      ✖
    </button>

    <button
        v-if="props.type === 'password' && modelValue"
        class="input-eye"
        @click="togglePassword"
    >
      <svg
          v-if="!showPassword"
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
      >
        <path d="M17.94 17.94A10.94 10.94 0 0112 20c-5 0-9.27-3.11-11-8a10.94 10.94 0 012.35-3.94M1 1l22 22" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: string
  placeholder?: string
  type?: 'text' | 'password'
  clearable?: boolean
  labelText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}>()

const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type !== 'password') return props.type || 'text'
  return showPassword.value ? 'text' : 'password'
})

function clearInput() {
  emit('update:modelValue', '')
  emit('clear')
}

function onInput(event: Event) {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}

function onFocus(event: FocusEvent) {
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
}

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 12px;
  border: 1px solid rgb(3, 10, 18);
  background: rgba(255, 255, 255, 0.15);
  color: #030a12;
  outline: none;
  transition: all 0.25s ease;
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
}

.input-label {
  font-size: 17px;
  font-weight: 500;
  color: #030a12;
  margin-right: 12px;
  white-space: nowrap;
}

.input:hover {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.input:active {
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) inset;
  transform: none;
}

.input-clear {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #030a12;
  font-size: 16px;
  cursor: pointer;
  visibility: hidden;
}

.input:not(:placeholder-shown) + .input-clear {
  visibility: visible;
}

.input-eye {
  position: absolute;
  top: 50%;
  right: 50px;
  transform: translateY(-38%);
  background: transparent;
  border: none;
  color: #030a12;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.input-eye:hover {
  opacity: 1;
}

.input::placeholder {
  color: rgba(211, 211, 211, 0.5);
}

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear,
input[type="password"]::-webkit-clear-button,
input[type="password"]::-webkit-inner-spin-button {
  display: none;
}
</style>
