<template>
  <div class="overview">
    <div class="overview-main">

      <!-- 顶部总标题 -->
      <h2 class="main-title">组件总览 Overview</h2>

      <!-- 搜索框 -->
      <div class="search-box">
        <input
            v-model="keyword"
            type="text"
            class="search-input"
            placeholder="搜索组件，例如：button / 输入框 / dialog"
        />
      </div>

      <!-- 内容大板块 -->
      <div class="box">

        <!-- ① 基础组件 -->
        <h3 id="basic" class="group-title">基础组件</h3>
        <div class="card-grid">
          <div
              class="card"
              v-for="item in filteredBase"
              :key="item.path"
              @click="go(item.path)"
          >
            <div class="card-title">{{ item.title }}</div>
            <div class="divider">
              <div class="preview-placeholder">
                <img src="/image_1.png" class="preview-icon" />
                <span class="preview-text">预览图施工中</span>
              </div>

            </div>
          </div>
        </div>

        <!-- ② 反馈组件 -->
        <h3 id="feedback" class="group-title">反馈组件</h3>
        <div class="card-grid">
          <div
              class="card"
              v-for="item in filteredFeedback"
              :key="item.path"
              @click="go(item.path)"
          >
            <div class="card-title">{{ item.title }}</div>
            <div class="divider">
              <div class="preview-placeholder">
                <img src="/image_1.png" class="preview-icon" />
                <span class="preview-text">预览图施工中</span>
              </div>

            </div>
          </div>
        </div>

        <!-- ③ 数据展示 -->
        <h3  id="show" class="group-title">数据展示</h3>
        <div class="card-grid">
          <div
              class="card"
              v-for="item in filteredData"
              :key="item.path"
              @click="go(item.path)"
          >
            <div class="card-title">{{ item.title }}</div>
            <div class="divider">
              <div class="preview-placeholder">
                <img src="/image_1.png" class="preview-icon" />
                <span class="preview-text">预览图施工中</span>
              </div>

            </div>
          </div>
        </div>

      </div><!-- box -->
    </div>

    <!-- 回到顶部按钮 -->
    <button
        id="backToTop"
        :class="{ show: showTopBtn }"
        @click="scrollTop"
    >
      ↑
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const keyword = ref("")

const base = [
  { title: "Button 按钮", path: "/button" },
  { title: "Input 输入框", path: "/input" },
  { title: "Switch 开关", path: "/switch" },
  { title: "Tab 标签页", path: "/tab" }
]

const feedback = [
  { title: "Dialog 弹窗", path: "/dialog" },
  { title: "Message 消息提示", path: "/message" },
  { title: "Window 悬浮窗", path: "/window" }
]

const data = [
  { title: "Tree 树形结构", path: "/tree" },
  { title: "Carousel 轮播图", path: "/carousel" }
]

const filter = (list: any[]) =>
    computed(() => {
      const k = keyword.value.toLowerCase()
      if (!k) return list
      return list.filter(i => i.title.toLowerCase().includes(k))
    })

const filteredBase = filter(base)
const filteredFeedback = filter(feedback)
const filteredData = filter(data)

function go(path: string) {
  router.push(path)
}

/* 回到顶部按钮逻辑 */
const showTopBtn = ref(false)

function onScroll() {
  showTopBtn.value = window.scrollY > 200
}

function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

onMounted(() => {
  window.addEventListener("scroll", onScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
})

const emit = defineEmits(['update-toc'])

const toc = [
  { id: 'basic', title: '基础组件' },
  { id: 'feedback', title: '反馈组件' },
  { id: 'show', title: '展示组件' },
]

onMounted(() => {
  emit('update-toc', toc)
})
</script>

<style scoped>
.overview-main {
  max-width: 960px;
  margin: 0 40px;
  padding: 0 16px;
  transition: padding 0.25s ease, max-width 0.25s ease;
}

.main-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}

.group-title {
  font-size: 20px;
  font-weight: 700;
  margin: 30px 0 14px;
}

.search-box {
  width: 100%;
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  height: 42px;
  padding: 0 16px;
  font-size: 15px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.15);
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(10px);
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.search-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 6px rgba(64,158,255,0.35);
}

.box {
  width: 100%;
  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.30);
  border-radius: 22px;
  padding: 20px 32px 40px;
  box-shadow: 0 4px 22px rgba(0,0,0,0.15);
  user-select: none;
  transition: padding 0.25s ease, border-radius 0.25s ease;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 260px));
  gap: 40px 50px;
  justify-content: center;
  transition: gap 0.25s ease;
}

.card {
  background: #fff;
  border-radius: 18px;
  padding: 30px 22px;
  height: 150px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  transition:
      transform 0.25s ease,
      box-shadow 0.25s ease,
      width 0.25s ease,
      padding 0.25s ease;
  width: 250px;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow:
      0 10px 28px rgba(0,0,0,0.22),
      0 0 12px rgba(255,255,255,0.55);
}

.card-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  color: rgb(112, 112, 112);
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba(0,0,0,0.15);
}

#backToTop {
  position: fixed;
  right: 10%;
  bottom: 40px;
  width: 48px;
  height: 48px;
  z-index: 1000;

  border: none;
  border-radius: 50%;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.30);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;

  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);

  transition:
      opacity 0.35s ease,
      transform 0.25s ease,
      box-shadow 0.25s ease,
      background 0.25s ease;
}

#backToTop.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

#backToTop:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.45);
  box-shadow:
      0 8px 24px rgba(0,0,0,0.20),
      0 0 12px rgba(255,255,255,0.55);
}

.preview-placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
}

.preview-icon {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.preview-text {
  font-size: 15px;
  color: #999;
}


</style>



