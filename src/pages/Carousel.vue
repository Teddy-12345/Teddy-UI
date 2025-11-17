<template>
  <div class="carousel-page">
    <button id="backToTop" :class="{ show: showTopBtn }" @click="scrollTop">↑</button>

    <div class="carousel-main">

      <h2 class="main-title">Carousel 轮播图</h2>
      <p class="sub-title">用于多图片或内容的自动或手动轮播展示。</p>

      <div class="box">

        <section class="section" id="basic">
          <h3 class="section-title">基础用法</h3>
          <p class="section-desc">传入 items 数组，使用 slot 渲染内容。</p>

          <div class="demo-card">
            <div class="demo-preview carousel-demo">
              <t-carousel :items="carouselItems">
                <template #default="{ item }">
                  <div class="demo-slide">{{ item }}</div>
                </template>
              </t-carousel>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">基础轮播示例</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('basic')">
                  {{ codeVisible.basic ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('basic')">
                  {{ copyState.basic ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.basic" class="code-block">
<code class="code-text">{{ codeSnippets.basic }}</code>
              </pre>
            </transition>
          </div>
        </section>

        <section class="section" id="custom">
          <h3 class="section-title">自定义内容</h3>
          <p class="section-desc">可在 slot 中使用任意内容。</p>

          <div class="demo-card">
            <div class="demo-preview carousel-demo">
              <t-carousel :items="images">
                <template #default="{ item }">
                  <img :src="item" class="demo-img" />
                </template>
              </t-carousel>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">自定义卡片</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('custom')">
                  {{ codeVisible.custom ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('custom')">
                  {{ copyState.custom ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.custom" class="code-block">
<code class="code-text">{{ codeSnippets.custom }}</code>
              </pre>
            </transition>
          </div>
        </section>

        <section class="section" id="api">
          <h3 class="section-title">API</h3>

          <div class="api-card">
            <h4 class="api-title">Props</h4>
            <table class="api-table">
              <thead>
              <tr>
                <th>参数</th>
                <th>说明</th>
                <th>类型</th>
                <th>默认值</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>items</code></td>
                <td>轮播内容数组</td>
                <td><code>any[]</code></td>
                <td>-</td>
              </tr>
              <tr>
                <td><code>interval</code></td>
                <td>自动切换时间(毫秒)</td>
                <td><code>number</code></td>
                <td><code>2800</code></td>
              </tr>
              <tr>
                <td><code>duration</code></td>
                <td>动画时长(毫秒)</td>
                <td><code>number</code></td>
                <td><code>450</code></td>
              </tr>
              </tbody>
            </table>

            <h4 class="api-title">Slots</h4>
            <table class="api-table">
              <thead>
              <tr><th>插槽名</th><th>说明</th></tr>
              </thead>
              <tbody>
              <tr>
                <td><code>default</code></td>
                <td>单个轮播内容，可接收 <code>item</code> 和 <code>index</code></td>
              </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Carousel as TCarousel } from './../components/Carousel'

const carouselItems = ['A 卡片','B 卡片','C 卡片']

const images = [
  'https://picsum.photos/600/300?1',
  'https://picsum.photos/600/300?2',
  'https://picsum.photos/600/300?3'
]

const showTopBtn = ref(false)
function onScroll(){ showTopBtn.value = window.scrollY > 200 }
function scrollTop(){ window.scrollTo({ top:0, behavior:'smooth' }) }
onMounted(()=> window.addEventListener('scroll', onScroll))
onUnmounted(()=> window.removeEventListener('scroll', onScroll))

type CodeKey = 'basic'|'custom'
const codeVisible = ref<Record<CodeKey,boolean>>({
  basic:false,
  custom:false
})
const copyState = ref<Record<CodeKey,boolean>>({
  basic:false,
  custom:false
})

function toggleCode(key:CodeKey){
  codeVisible.value[key] = !codeVisible.value[key]
}

async function copyCode(key:CodeKey){
  await navigator.clipboard.writeText(codeSnippets[key])
  copyState.value[key] = true
  setTimeout(()=> copyState.value[key] = false,1200)
}

const codeSnippets:Record<CodeKey,string> = {
  basic: [
    '<t-carousel :items="items">',
    '  <template #default="{ item }">',
    '    <div>{{ item }}</div>',
    '  </template>',
    '</t-carousel>'
  ].join('\n'),

  custom: [
    '<t-carousel :items="images">',
    '  <template #default="{ item }">',
    '    <img :src="item" />',
    '  </template>',
    '</t-carousel>'
  ].join('\n')
}

const emit = defineEmits(['update-toc'])
const toc = [
  { id:'basic', title:'基础用法' },
  { id:'custom', title:'自定义内容' },
  { id:'api', title:'API' }
]
onMounted(()=> emit('update-toc', toc))
</script>

<style scoped>
.carousel-main {
  max-width: 960px;
  margin: 0 40px;
  padding: 0 16px;
}
.main-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}
.sub-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}
.box {
  width: 100%;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 22px;
  padding: 20px 32px 40px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.08);
}
.section { margin-bottom: 32px; }
.section-title {
  font-size:20px;
  font-weight:700;
  margin-bottom:8px;
}
.section-desc {
  font-size:13px;
  color:#666;
  margin-bottom:14px;
}
.demo-card {
  background:rgba(255,255,255,0.95);
  backdrop-filter:blur(8px);
  border-radius:18px;
  padding:16px 18px 10px;
  border:1px solid rgba(0,0,0,0.04);
  box-shadow:0 3px 12px rgba(0,0,0,0.06);
}
.carousel-demo {
  width:100%;
  height:260px;
}
.demo-slide {
  font-size:40px;
  font-weight:600;
  display:flex;
  align-items:center;
  justify-content:center;
}
.demo-img {
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:14px;
}
.demo-footer {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:8px;
  padding-top:8px;
  border-top:1px solid rgba(0,0,0,0.05);
}
.demo-tip {
  font-size:12px;
  color:#777;
}
.demo-actions {
  display:flex;
  align-items:center;
  gap:6px;
}
.code-toggle,
.code-copy {
  border:none;
  cursor:pointer;
  padding:4px 10px;
  border-radius:999px;
  font-size:12px;
  color:#333;
  background:rgba(255,255,255,0.95);
  box-shadow:0 1px 6px rgba(0,0,0,0.08);
}
.code-block {
  margin-top:8px;
  padding:10px 14px;
  border-radius:14px;
  background:#111;
  color:#f5f5f5;
  font-size:12px;
  overflow-x:auto;
  line-height:1.6;
  box-shadow:0 3px 14px rgba(0,0,0,0.35);
}
.code-fade-enter-active,
.code-fade-leave-active {
  transition:opacity .25s ease, transform .25s ease;
}
.code-fade-enter-from,
.code-fade-leave-to {
  opacity:0;
  transform:translateY(-4px);
}
.api-card {
  margin-top:8px;
  background:rgba(255,255,255,0.95);
  backdrop-filter:blur(8px);
  border-radius:18px;
  padding:16px 18px 18px;
  border:1px solid rgba(0,0,0,0.04);
  box-shadow:0 3px 12px rgba(0,0,0,0.06);
  user-select:text;
}
.api-table {
  width:100%;
  border-collapse:collapse;
  margin-bottom:10px;
  font-size:13px;
}
.api-table th,
.api-table td {
  padding:6px 8px;
  text-align:left;
  border-bottom:1px solid rgba(0,0,0,0.06);
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
</style>
