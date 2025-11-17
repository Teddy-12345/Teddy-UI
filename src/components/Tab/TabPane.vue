<template>
  <div
      v-show="activeName === name"
      class="t-tab-pane"
      ref="el"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'

const props = defineProps<{
  name: string
  label: string
}>()

const register = inject<any>('tabRegister')
const activeName = inject<any>('tabActive')

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  register({
    name: props.name,
    label: props.label,
    el: el.value!
  })
})
</script>

<style scoped>
.t-tab-pane {
  padding: 2px;
}
</style>
