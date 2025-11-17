<template>
  <div class="tab-page">
    <button
        id="backToTop"
        :class="{ show: showTopBtn }"
        @click="scrollTop"
    >
      ↑
    </button>

    <div class="tab-main">
      <h2 class="main-title">Tab 标签页</h2>
      <p class="sub-title">用于在同一区域切换不同内容。</p>

      <div class="box">

        <!-- 基础用法 -->
        <section id="basic" class="section">
          <h3 class="section-title">基础用法</h3>
          <p class="section-desc">使用 <code>&lt;t-tab&gt;</code> 组织导航结构。</p>

          <div class="demo-card">
            <div class="demo-preview" v-show="demoReady">
              <t-tab>
                <t-tab-pane name="a" label="苹果">苹果内容</t-tab-pane>
                <t-tab-pane name="b" label="香蕉">香蕉内容</t-tab-pane>
                <t-tab-pane name="c" label="橘子">橘子内容</t-tab-pane>
              </t-tab>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">最基础的标签切换。</span>
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


        <!-- v-model -->
        <section id="vmodel" class="section">
          <h3 class="section-title">受控模式 v-model</h3>
          <p class="section-desc">通过 <code>v-model</code> 控制激活项。</p>

          <div class="demo-card">
            <div class="demo-preview" v-show="demoReady">
              <t-tab v-model="activeTab">
                <t-tab-pane name="info" label="信息">信息内容</t-tab-pane>
                <t-tab-pane name="setting" label="设置">设置内容</t-tab-pane>
                <t-tab-pane name="data" label="数据">数据内容</t-tab-pane>
              </t-tab>

              <div class="example-state">
                当前激活：<code>{{ activeTab }}</code>
              </div>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">适合动态切换内容。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('vmodel')">
                  {{ codeVisible.vmodel ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('vmodel')">
                  {{ copyState.vmodel ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.vmodel" class="code-block">
<code class="code-text">{{ codeSnippets.vmodel }}</code>
              </pre>
            </transition>
          </div>
        </section>


        <!-- 默认激活项 -->
        <section id="default" class="section">
          <h3 class="section-title">默认激活项</h3>
          <p class="section-desc">通过 <code>default</code> 指定默认选中。</p>

          <div class="demo-card">
            <div class="demo-preview" v-show="demoReady">
              <t-tab default="b">
                <t-tab-pane name="a" label="水果">水果内容</t-tab-pane>
                <t-tab-pane name="b" label="蔬菜">蔬菜内容</t-tab-pane>
                <t-tab-pane name="c" label="零食">零食内容</t-tab-pane>
              </t-tab>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">指定初始激活项。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('default')">
                  {{ codeVisible.default ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('default')">
                  {{ copyState.default ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.default" class="code-block">
<code class="code-text">{{ codeSnippets.default }}</code>
              </pre>
            </transition>
          </div>
        </section>


        <!-- API -->
        <section id="api" class="section">
          <h3 class="section-title">API</h3>

          <div class="api-card">

            <h4 class="api-title">Tab Props</h4>
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
                <td><code>modelValue</code></td>
                <td>受控激活项</td>
                <td><code>string</code></td>
                <td>-</td>
              </tr>
              <tr>
                <td><code>default</code></td>
                <td>默认激活</td>
                <td><code>string</code></td>
                <td>-</td>
              </tr>
              </tbody>
            </table>

            <h4 class="api-title">TabPane Props</h4>
            <table class="api-table">
              <thead>
              <tr>
                <th>参数</th>
                <th>说明</th>
                <th>类型</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>name</code></td>
                <td>唯一标识</td>
                <td><code>string</code></td>
              </tr>
              <tr>
                <td><code>label</code></td>
                <td>标签名</td>
                <td><code>string</code></td>
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
import TTab from './../components/Tab/Tab.vue'
import TTabPane from './../components/Tab/TabPane.vue'

const demoReady = ref(false)
onMounted(() => demoReady.value = true)

const showTopBtn = ref(false)
function onScroll(){ showTopBtn.value = window.scrollY > 200 }
function scrollTop(){ window.scrollTo({ top:0, behavior:'smooth' }) }
onMounted(()=> window.addEventListener('scroll', onScroll))
onUnmounted(()=> window.removeEventListener('scroll', onScroll))

const activeTab = ref('info')

type CodeKey = 'basic' | 'vmodel' | 'default'
const codeVisible = ref<Record<CodeKey, boolean>>({
  basic:false, vmodel:false, default:false
})
const copyState = ref<Record<CodeKey, boolean>>({
  basic:false, vmodel:false, default:false
})

function toggleCode(key:CodeKey){
  codeVisible.value[key] = !codeVisible.value[key]
}

async function copyCode(key:CodeKey){
  await navigator.clipboard.writeText(codeSnippets[key])
  copyState.value[key] = true
  setTimeout(()=> copyState.value[key] = false, 1200)
}

const codeSnippets:Record<CodeKey,string> = {

  basic: [
    '<t-tab>',
    '  <t-tab-pane name="a" label="苹果">苹果内容</t-tab-pane>',
    '  <t-tab-pane name="b" label="香蕉">香蕉内容</t-tab-pane>',
    '  <t-tab-pane name="c" label="橘子">橘子内容</t-tab-pane>',
    '</t-tab>'
  ].join('\n'),

  vmodel: [
    '<t-tab v-model="active">',
    '  <t-tab-pane name="info" label="信息">信息内容</t-tab-pane>',
    '  <t-tab-pane name="setting" label="设置">设置内容</t-tab-pane>',
    '  <t-tab-pane name="data" label="数据">数据内容</t-tab-pane>',
    '</t-tab>',
    '',
    '&lt;script setup&gt;',
    "import { ref } from 'vue'",
    "const active = ref('info')",
    '&lt;/script&gt;'
  ].join('\n'),

  default: [
    '<t-tab default="b">',
    '  <t-tab-pane name="a" label="水果">水果内容</t-tab-pane>',
    '  <t-tab-pane name="b" label="蔬菜">蔬菜内容</t-tab-pane>',
    '  <t-tab-pane name="c" label="零食">零食内容</t-tab-pane>',
    '</t-tab>'
  ].join('\n')
}

const emit = defineEmits(['update-toc'])
const toc = [
  { id:'basic', title:'基础用法' },
  { id:'vmodel', title:'受控模式 v-model' },
  { id:'default', title:'默认激活项' },
  { id:'api', title:'API' }
]
onMounted(()=> emit('update-toc', toc))
</script>

<style scoped>
.tab-main {
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

.demo-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 16px 18px 10px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
}

.demo-preview {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 10px;
}

.example-state {
  font-size: 13px;
  color: #444;
}

.demo-footer {
  display: flex;
  justify-content: space-between;
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
  border: none;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: #333;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  transition: background .2s ease, transform .2s ease;
}

.code-toggle:hover,
.code-copy:hover {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

.code-toggle:active,
.code-copy:active {
  transform: scale(0.96);
}

.code-block {
  margin-top: 8px;
  padding: 10px 14px;
  border-radius: 14px;
  background: #111;
  color: #f5f5f5;
  font-size: 12px;
  overflow-x: auto;
  line-height: 1.6;
  box-shadow: 0 3px 14px rgba(0,0,0,0.35);
}

.code-text {
  white-space: pre;
}

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
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 16px 18px 18px;
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
  margin-bottom: 10px;
  font-size: 13px;
}

.api-table th,
.api-table td {
  padding: 6px 8px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.api-table th {
  background: rgba(255,255,255,0.9);
}

#backToTop {
  position: fixed;
  right: 10%;
  bottom: 40px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: rgba(255,255,255,0.30);
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
  transition: opacity .35s ease, transform .25s ease, box-shadow .25s ease;
}

#backToTop.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

#backToTop:hover {
  transform: translateY(-4px);
  background: rgba(255,255,255,0.45);
  box-shadow: 0 8px 24px rgba(0,0,0,0.20);
}
</style>
