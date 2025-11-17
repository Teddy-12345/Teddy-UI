<template>
  <div class="t-message-container">
    <Message
        v-for="msg in messages"
        :key="msg.id"
        :id="msg.id"
        :text="msg.text"
        :type="msg.type"
        :duration="msg.duration"
        :offset="msg.offset"
        @close="remove"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Message from './Message.vue'

export interface MessageItem {
  id: number
  text: string
  type: string
  duration: number
  offset: number
}

const messages = ref<MessageItem[]>([])

function add(msg: Omit<MessageItem, 'offset'>) {
  const offset = messages.value.length * 60

  messages.value.push({
    ...msg,
    offset
  })
}

function remove(id: number) {
  const index = messages.value.findIndex(m => m.id === id)
  if (index !== -1) messages.value.splice(index, 1)
}

defineExpose({
  add,
  remove,
  getCount: () => messages.value.length
})
</script>

<style scoped>
.t-message-container {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 99999;
  pointer-events: none;
  user-select: none;
}
</style>
