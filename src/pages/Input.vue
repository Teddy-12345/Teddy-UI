<template>
  <div class="input-page">
    <button
        id="backToTop"
        :class="{ show: showTopBtn }"
        @click="scrollTop"
    >
      ↑
    </button>

    <div class="input-main">
      <h2 class="main-title">Input 输入框</h2>
      <p class="sub-title">用于文本录入、密码输入与动态控制。</p>

      <div class="box">

        <section class="section" id="basic">
          <h3 class="section-title">基础用法</h3>
          <p class="section-desc">基础文本输入框。</p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-input v-model="textBasic" placeholder="请输入内容" />
            </div>

            <div class="demo-footer">
              <span class="demo-tip">基础输入框示例。</span>
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
                <pre class="code-block"><code class="code-text">{{ codeSnippets.basic }}</code></pre>
              </div>
            </transition>
          </div>
        </section>

        <section class="section" id="password">
          <h3 class="section-title">密码框</h3>
          <p class="section-desc">带眼睛图标可切换明文/密文。</p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-input v-model="textPass" type="password" placeholder="密码" />
            </div>

            <div class="demo-footer">
              <span class="demo-tip">支持切换显示密码。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('password')">
                  {{ codeVisible.password ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('password')">
                  {{ copyState.password ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-expand">
              <div v-if="codeVisible.password" class="code-wrapper">
                <pre class="code-block"><code class="code-text">{{ codeSnippets.password }}</code></pre>
              </div>
            </transition>
          </div>
        </section>

        <section class="section" id="clearable">
          <h3 class="section-title">可清空</h3>
          <p class="section-desc">带清空图标的输入框。</p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-input v-model="textClear" clearable placeholder="可清空" />
            </div>

            <div class="demo-footer">
              <span class="demo-tip">输入内容后可一键清空。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('clearable')">
                  {{ codeVisible.clearable ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('clearable')">
                  {{ copyState.clearable ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-expand">
              <div v-if="codeVisible.clearable" class="code-wrapper">
                <pre class="code-block"><code class="code-text">{{ codeSnippets.clearable }}</code></pre>
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
              <tr><td><code>modelValue</code></td><td>输入内容</td><td><code>string</code></td><td>-</td></tr>
              <tr><td><code>type</code></td><td>输入类型</td><td><code>'text' | 'password'</code></td><td><code>'text'</code></td></tr>
              <tr><td><code>clearable</code></td><td>是否可清空</td><td><code>boolean</code></td><td><code>false</code></td></tr>
              <tr><td><code>placeholder</code></td><td>占位文本</td><td><code>string</code></td><td>-</td></tr>
              </tbody>
            </table>

            <h4 class="api-title">Events</h4>
            <table class="api-table">
              <thead>
              <tr>
                <th>事件名</th><th>说明</th><th>参数</th>
              </tr>
              </thead>
              <tbody>
              <tr><td><code>update:modelValue</code></td><td>输入变化</td><td><code>string</code></td></tr>
              <tr><td><code>clear</code></td><td>清空触发</td><td>-</td></tr>
              <tr><td><code>focus</code></td><td>聚焦时触发</td><td><code>FocusEvent</code></td></tr>
              <tr><td><code>blur</code></td><td>失焦时触发</td><td><code>FocusEvent</code></td></tr>
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
function onScroll() { showTopBtn.value = window.scrollY > 200 }
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const textBasic = ref('')
const textPass = ref('')
const textClear = ref('')

type CodeKey = 'basic' | 'password' | 'clearable'
const codeVisible = ref<Record<CodeKey, boolean>>({ basic: false, password: false, clearable: false })
const copyState = ref<Record<CodeKey, boolean>>({ basic: false, password: false, clearable: false })

function toggleCode(key: CodeKey) { codeVisible.value[key] = !codeVisible.value[key] }
async function copyCode(key: CodeKey) {
  await navigator.clipboard.writeText(codeSnippets[key])
  copyState.value[key] = true
  setTimeout(() => copyState.value[key] = false, 1200)
}

const codeSnippets: Record<CodeKey, string> = {
  basic:`<t-input v-model="text" placeholder="请输入内容" />`,
  password:`<t-input v-model="text" type="password" placeholder="密码" />`,
  clearable:`<t-input v-model="text" clearable placeholder="可清空" />`
}

const emit = defineEmits(['update-toc'])
const toc = [
  { id:'basic', title:'基础用法' },
  { id:'password', title:'密码框' },
  { id:'clearable', title:'可清空' },
  { id:'api', title:'API' }
]
onMounted(() => emit('update-toc', toc))
</script>

<style scoped>
.input-main {
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 16px 18px 10px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
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
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.demo-tip {
  font-size: 12px;
  color: #777;
}

.demo-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.code-toggle,
.code-copy {
  border: none;
  outline: none;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: #333;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.code-toggle:hover,
.code-copy:hover {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
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
  color: #f5f5f5;
  font-size: 12px;
  overflow-x: auto;
  line-height: 1.6;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.35);
}

.code-text {
  white-space: pre;
}

.code-expand-enter-active,
.code-expand-leave-active {
  transition: height .35s ease, opacity .35s ease, transform .35s ease;
}

.code-expand-enter-from,
.code-expand-leave-to {
  height: 0;
  opacity: 0;
  transform: translateY(-4px);
}

.code-expand-enter-to,
.code-expand-leave-from {
  height: auto;
  opacity: 1;
  transform: translateY(0);
}

.api-card {
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 16px 18px 18px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.api-table th {
  font-weight: 600;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
}

.api-table,
.api-table * {
  user-select: text;
}

code {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace;
  font-size: 12px;
}

@media (max-width: 768px) {
  .input-main {
    margin: 0 16px;
    padding: 0 8px;
  }

  .box {
    padding: 16px 16px 28px;
  }

  .demo-card {
    padding: 12px 12px 8px;
  }

  .api-card {
    padding: 12px 12px 14px;
  }
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
  transition: opacity 0.35s ease, transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

#backToTop.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

#backToTop:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.45);
  box-shadow: 0 8px 24px rgba(0,0,0,0.20), 0 0 12px rgba(255,255,255,0.55);
}

</style>