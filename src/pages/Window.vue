<template>
  <div class="window-page">
    <button id="backToTop" :class="{ show: showTopBtn }" @click="scrollTop">↑</button>

    <div class="window-main">
      <h2 class="main-title">Window 卡片</h2>
      <p class="sub-title">用于展示小型信息面板、区域模块或卡片内容。</p>

      <div class="box">

        <!-- 基础 -->
        <section class="section" id="basic">
          <h3 class="section-title">基础用法</h3>
          <p class="section-desc">最基础的方块卡片结构。</p>

          <div class="demo-card">
            <div class="demo-preview-grid">
              <t-window title="卡片 A">内容区域</t-window>
              <t-window title="卡片 B">内容区域</t-window>
              <t-window title="卡片 C">内容区域</t-window>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">默认白色卡片。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('basic')">{{ codeVisible.basic ? '隐藏代码' : '显示代码' }}</button>
                <button class="code-copy" @click="copyCode('basic')">{{ copyState.basic ? '已复制' : '复制代码' }}</button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.basic" class="code-block"><code class="code-text">{{ codeSnippets.basic }}</code></pre>
            </transition>
          </div>
        </section>

        <!-- 玻璃模式 -->
        <section class="section" id="glass">
          <h3 class="section-title">玻璃模式</h3>
          <p class="section-desc">启用透明毛玻璃，小卡片更精致。</p>

          <div class="demo-card">
            <div class="demo-preview-grid">
              <t-window glass title="Glass A">内容</t-window>
              <t-window glass title="Glass B">内容</t-window>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">透明磨砂背景。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('glass')">{{ codeVisible.glass ? '隐藏代码' : '显示代码' }}</button>
                <button class="code-copy" @click="copyCode('glass')">{{ copyState.glass ? '已复制' : '复制代码' }}</button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.glass" class="code-block"><code class="code-text">{{ codeSnippets.glass }}</code></pre>
            </transition>
          </div>
        </section>

        <!-- 交互 -->
        <section class="section" id="hover">
          <h3 class="section-title">交互特性</h3>
          <p class="section-desc">支持 hover 或点击。</p>

          <div class="demo-card">
            <div class="demo-preview-grid">
              <t-window hoverable title="Hover">内容</t-window>
              <t-window clickable title="Clickable" @click="onClickCard">点击事件</t-window>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">选用交互模式。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('hover')">{{ codeVisible.hover ? '隐藏代码' : '显示代码' }}</button>
                <button class="code-copy" @click="copyCode('hover')">{{ copyState.hover ? '已复制' : '复制代码' }}</button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.hover" class="code-block"><code class="code-text">{{ codeSnippets.hover }}</code></pre>
            </transition>
          </div>
        </section>

        <!-- API -->
        <section class="section" id="api">
          <h3 class="section-title">API</h3>

          <div class="api-card">

            <h4 class="api-title">Props</h4>
            <table class="api-table">
              <thead>
              <tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr>
              </thead>
              <tbody>
              <tr><td>title</td><td>标题文本</td><td>string</td><td>-</td></tr>
              <tr><td>width</td><td>卡片宽度</td><td>number / string</td><td>260</td></tr>
              <tr><td>height</td><td>卡片高度</td><td>number / string</td><td>160</td></tr>
              <tr><td>color</td><td>背景色</td><td>string</td><td>#fff</td></tr>
              <tr><td>glass</td><td>是否毛玻璃</td><td>boolean</td><td>false</td></tr>
              <tr><td>hoverable</td><td>悬浮高亮</td><td>boolean</td><td>false</td></tr>
              <tr><td>clickable</td><td>是否可点击</td><td>boolean</td><td>false</td></tr>
              <tr><td>shadowColor</td><td>阴影颜色</td><td>string</td><td>rgba(0,0,0,0.25)</td></tr>
              </tbody>
            </table>

            <h4 class="api-title">Events</h4>
            <table class="api-table">
              <thead>
              <tr><th>事件名</th><th>说明</th><th>参数</th></tr>
              </thead>
              <tbody>
              <tr><td>click</td><td>点击时触发</td><td>MouseEvent</td></tr>
              </tbody>
            </table>

            <h4 class="api-title">Slots</h4>
            <table class="api-table">
              <thead>
              <tr><th>插槽名</th><th>说明</th></tr>
              </thead>
              <tbody>
              <tr><td>default</td><td>内容区域</td></tr>
              <tr><td>title</td><td>标题插槽</td></tr>
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

import TWindow from './../components/Window/Window.vue'

const showTopBtn = ref(false)
function onScroll(){ showTopBtn.value = window.scrollY > 200 }
function scrollTop(){ window.scrollTo({ top:0, behavior:'smooth' }) }
onMounted(()=> window.addEventListener('scroll', onScroll))
onUnmounted(()=> window.removeEventListener('scroll', onScroll))

const codeVisible = ref({ basic:false, glass:false, hover:false })
const copyState  = ref({ basic:false, glass:false, hover:false })

function toggleCode(key:string){ codeVisible.value[key] = !codeVisible.value[key] }

async function copyCode(key:string){
  await navigator.clipboard.writeText(codeSnippets[key])
  copyState.value[key] = true
  setTimeout(()=> copyState.value[key] = false, 1200)
}

function onClickCard(){ console.log('clicked') }

const codeSnippets = {
  basic: [
    '<t-window title="卡片 A">内容区域</t-window>',
    '<t-window title="卡片 B">内容区域</t-window>',
    '<t-window title="卡片 C">内容区域</t-window>'
  ].join('\n'),

  glass: [
    '<t-window glass title="Glass A">内容</t-window>',
    '<t-window glass title="Glass B">内容</t-window>'
  ].join('\n'),

  hover: [
    '<t-window hoverable title="Hover">内容</t-window>',
    '<t-window clickable title="Clickable" @click="onClickCard">点击事件</t-window>'
  ].join('\n'),
}

const emit = defineEmits(['update-toc'])

const toc = [
  { id:'basic', title:'基础用法' },
  { id:'glass', title:'玻璃模式' },
  { id:'hover', title:'交互特性' },
  { id:'api', title:'API' }
]

onMounted(()=> emit('update-toc', toc))
</script>

<style scoped>
.window-main {
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 22px;
  padding: 20px 32px 40px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.08);
}

.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.section-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 14px;
}

.demo-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.demo-card {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 16px 18px 10px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
}

.demo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.demo-tip {
  font-size: 12px;
  color: #777;
}

.demo-actions {
  display: flex;
  gap: 6px;
}

.code-toggle,
.code-copy {
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  border: none;
  cursor: pointer;
}

.code-block {
  padding: 10px 14px;
  background: #111;
  color:#eee;
  border-radius: 14px;
  margin-top: 10px;
  font-size: 12px;
}

.code-text { white-space: pre; }

.code-fade-enter-active,
.code-fade-leave-active {
  transition: opacity .25s ease, transform .25s ease;
}

.code-fade-enter-from,
.code-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.api-card {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
  user-select: text;
}

.api-title {
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0 6px;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 14px;
}

.api-table th,
.api-table td {
  padding: 6px 8px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  text-align: left;
}

#backToTop {
  position: fixed;
  right: 10%;
  bottom: 50px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;

  background: rgba(255, 255, 255, 0.30);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow:
      0 8px 25px rgba(0,0,0,0.15),
      inset 0 0 0 rgba(255,255,255,0.5);

  opacity: 0;
  transform: translateY(8px);
  pointer-events: none;

  transition:
      opacity 0.35s ease,
      transform 0.35s ease,
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
      0 12px 28px rgba(0,0,0,0.20),
      0 0 14px rgba(255,255,255,0.55);
}

</style>
