<template>
  <aside class="toc" v-show="items.length">
    <div class="toc-box">
      <div class="toc-title">目录</div>

      <nav class="toc-list">
        <a
            v-for="item in items"
            :key="item.id"
            :href="'#' + item.id"
            :class="['toc-item', activeId === item.id && 'active']"
            @click.prevent="scrollTo(item.id)"
        >
          {{ item.title }}
        </a>
      </nav>
    </div>
  </aside>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ items: TocItem[] }>()
const activeId = ref('')

let ticking = false

const update = () => {
  let current = ''
  for (const item of props.items) {
    const el = document.getElementById(item.id)
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.top <= 200) current = item.id
  }
  activeId.value = current || props.items[0]?.id || ''
  ticking = false
}

const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(update)
}

const scrollTo = (id: string) => {
  const t = document.getElementById(id)
  if (!t) return
  window.scrollTo({
    top: t.offsetTop + 80,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  update()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>


<style scoped>
.toc {
  position: fixed;
  right: 60px;
  top: 120px;
  width: 200px;
}

.toc-box {
  width: 100%;
  padding: 20px 18px 18px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.30);
  border-radius: 22px;
  box-shadow: 0 4px 22px rgba(0, 0, 0, 0.15);
  user-select: none;
  transition: 0.25s ease;
}

.toc-title {
  font-size: 20px;
  font-weight: 600;
  color: #999;
  letter-spacing: 1px;
  margin-bottom: 12px;
  padding-left: 2px;
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toc-item {
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  text-decoration: none;
  transition: 0.2s ease;
}

.toc-item:hover {
  background: rgba(64, 158, 255, 0.08);
  color: #409eff;
}

.toc-item.active {
  background: rgba(64, 158, 255, 0.12);
  color: #409eff;
  font-weight: 600;
}

@media (max-width: 1300px) {
  .toc {
    display: none;
  }
}
</style>
