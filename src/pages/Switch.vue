<template>
  <div class="switch-page">
    <button id="backToTop" :class="{ show: showTopBtn }" @click="scrollTop">↑</button>

    <div class="switch-main">
      <h2 class="main-title">Switch 开关</h2>
      <p class="sub-title">用于开启或关闭某个功能选项。</p>

      <div class="box">

        <section class="section" id="basic">
          <h3 class="section-title">基础用法</h3>
          <p class="section-desc">通过 <code>v-model</code> 控制开关状态。</p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-switch v-model="basic" />
            </div>

            <div class="demo-footer">
              <span class="demo-tip">最常见的开关形式。</span>

              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('basic')">
                  {{ codeVisible.basic ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('basic')">
                  {{ copyState.basic ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-expand">
              <div v-if="codeVisible.basic" class="code-wrapper">
                <pre class="code-block">
<code class="code-text">{{ codeSnippets.basic }}</code>
                </pre>
              </div>
            </transition>
          </div>
        </section>

        <section class="section" id="color">
          <h3 class="section-title">颜色主题</h3>
          <p class="section-desc">通过 <code>color</code> 设置主题颜色。</p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-switch v-model="c1" color="green" />
              <t-switch v-model="c2" color="red" />
              <t-switch v-model="c3" color="yellow" />
              <t-switch v-model="c4" color="gray" />
              <t-switch v-model="c5" color="black" />
              <t-switch v-model="c6" color="white" />
            </div>

            <div class="demo-footer">
              <span class="demo-tip">支持多种主题色。</span>

              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('color')">
                  {{ codeVisible.color ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('color')">
                  {{ copyState.color ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-expand">
              <div v-if="codeVisible.color" class="code-wrapper">
                <pre class="code-block">
<code class="code-text">{{ codeSnippets.color }}</code>
                </pre>
              </div>
            </transition>
          </div>
        </section>

        <section class="section" id="logo">
          <h3 class="section-title">Logo 模式</h3>
          <p class="section-desc">设置 <code>logo</code> 显示 I/O 状态指示。</p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-switch v-model="logoState" logo />
            </div>

            <div class="demo-footer">
              <span class="demo-tip">带 I/O 标识的开关。</span>

              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('logo')">
                  {{ codeVisible.logo ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('logo')">
                  {{ copyState.logo ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-expand">
              <div v-if="codeVisible.logo" class="code-wrapper">
                <pre class="code-block">
<code class="code-text">{{ codeSnippets.logo }}</code>
                </pre>
              </div>
            </transition>
          </div>
        </section>

        <section class="section" id="disabled">
          <h3 class="section-title">禁用状态</h3>
          <p class="section-desc">通过 <code>disabled</code> 禁用交互。</p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-switch v-model="disabledState1" disabled />
              <t-switch v-model="disabledState2" disabled />
            </div>

            <div class="demo-footer">
              <span class="demo-tip">禁用状态无法点击。</span>

              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('disabled')">
                  {{ codeVisible.disabled ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('disabled')">
                  {{ copyState.disabled ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-expand">
              <div v-if="codeVisible.disabled" class="code-wrapper">
                <pre class="code-block">
<code class="code-text">{{ codeSnippets.disabled }}</code>
                </pre>
              </div>
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
                <th>参数</th><th>说明</th><th>类型</th><th>默认值</th>
              </tr>
              </thead>

              <tbody>
              <tr><td><code>modelValue</code></td><td>开关状态</td><td><code>boolean</code></td><td><code>false</code></td></tr>
              <tr><td><code>color</code></td><td>主题颜色</td><td><code>'black'|'gray'|'green'|'red'|'yellow'|'white'</code></td><td><code>'green'</code></td></tr>
              <tr><td><code>disabled</code></td><td>是否禁用</td><td><code>boolean</code></td><td><code>false</code></td></tr>
              <tr><td><code>logo</code></td><td>I/O 标识</td><td><code>boolean</code></td><td><code>false</code></td></tr>
              </tbody>
            </table>

            <h4 class="api-title">Events</h4>

            <table class="api-table">
              <thead>
              <tr><th>事件名</th><th>说明</th><th>参数</th></tr>
              </thead>

              <tbody>
              <tr><td><code>update:modelValue</code></td><td>状态变化时触发</td><td><code>boolean</code></td></tr>
              <tr><td><code>change</code></td><td>状态变更</td><td><code>boolean</code></td></tr>
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

const showTopBtn = ref(false)
function onScroll(){ showTopBtn.value = window.scrollY > 200 }
function scrollTop(){ window.scrollTo({ top:0, behavior:'smooth' }) }
onMounted(()=> window.addEventListener('scroll', onScroll))
onUnmounted(()=> window.removeEventListener('scroll', onScroll))

const basic = ref(false)
const c1 = ref(true)
const c2 = ref(true)
const c3 = ref(true)
const c4 = ref(true)
const c5 = ref(true)
const c6 = ref(true)
const logoState = ref(false)
const disabledState1 = ref(false)
const disabledState2 = ref(true)

type CodeKey = 'basic'|'color'|'logo'|'disabled'
const codeVisible = ref<Record<CodeKey,boolean>>({
  basic:false, color:false, logo:false, disabled:false
})
const copyState = ref<Record<CodeKey,boolean>>({
  basic:false, color:false, logo:false, disabled:false
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
  basic:`<t-switch v-model="value" />`,
  color:`<t-switch v-model="v1" color="green" />
<t-switch v-model="v2" color="red" />
<t-switch v-model="v3" color="yellow" />
<t-switch v-model="v4" color="gray" />
<t-switch v-model="v5" color="black" />
<t-switch v-model="v6" color="white" />`,
  logo:`<t-switch v-model="value" logo />`,
  disabled:`<t-switch v-model="value1" disabled />
<t-switch v-model="value2" disabled />`
}

const emit = defineEmits(['update-toc'])
const toc = [
  { id:'basic', title:'基础用法' },
  { id:'color', title:'颜色主题' },
  { id:'logo', title:'Logo 模式' },
  { id:'disabled', title:'禁用状态' },
  { id:'api', title:'API' }
]
onMounted(()=> emit('update-toc', toc))
</script>

<style scoped>
.switch-main {
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
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
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
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 18px;
  padding: 16px 18px 10px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
}

.demo-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  align-items: center;
  margin-bottom: 10px;
}

.demo-footer {
  display: flex;
  align-items: center;
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
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
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

.code-wrapper {
  overflow: hidden;
}

.code-block {
  margin-top: 8px;
  padding: 10px 14px;
  border-radius: 14px;
  background: #111;
  color: #fafafa;
  font-size: 12px;
  overflow-x: auto;
  line-height: 1.6;
  box-shadow: 0 3px 14px rgba(0,0,0,0.35);
}

.code-text {
  white-space: pre;
}

.code-expand-enter-active,
.code-expand-leave-active {
  transition: max-height .35s ease, opacity .35s ease, transform .35s ease;
}

.code-expand-enter-from,
.code-expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-4px);
}

.code-expand-enter-to,
.code-expand-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}

.api-card {
  background: rgba(255,255,255,0.95);
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
  text-align: left;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.api-table th {
  font-weight: 600;
  color: #333;
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
  box-shadow: 0 8px 24px rgba(0,0,0,0.20), 0 0 12px rgba(255,255,255,0.55);
}
</style>
