<template>
  <div class="dialog-page">
    <button
        id="backToTop"
        :class="{ show: showTopBtn }"
        @click="scrollTop"
    >
      ↑
    </button>

    <div class="dialog-main">
      <h2 class="main-title">Dialog 弹窗</h2>
      <p class="sub-title">用于消息提示、确认操作、展示内容。</p>

      <div class="box">

        <!-- 基础用法 -->
        <section class="section" id="basic">
          <h3 class="section-title">基础用法</h3>
          <p class="section-desc">最简单的弹窗，需要手动控制显隐。</p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-button color="blue" @click="dialogBasic = true">打开弹窗</t-button>
              <t-dialog v-model="dialogBasic" title="提示">
                这是一个基础弹窗。
              </t-dialog>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">点击按钮打开弹窗。</span>
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

        <!-- 双按钮 -->
        <section class="section" id="double">
          <h3 class="section-title">双按钮模式</h3>
          <p class="section-desc">适合需要确认和取消的场景。</p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-button color="green" @click="dialogDouble = true">打开双按钮弹窗</t-button>
              <t-dialog
                  v-model="dialogDouble"
                  title="操作确认"
                  doubleButton
              >
                你确认要继续吗？
              </t-dialog>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">带“确认 / 取消”按钮。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('double')">
                  {{ codeVisible.double ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('double')">
                  {{ copyState.double ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.double" class="code-block">
<code class="code-text">{{ codeSnippets.double }}</code>
              </pre>
            </transition>
          </div>
        </section>

        <!-- 背景效果 -->
        <section class="section" id="background">
          <h3 class="section-title">背景效果</h3>
          <p class="section-desc">支持暗色背景、模糊背景等效果。</p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-button color="yellow" @click="dialogBlur = true">模糊背景</t-button>

              <t-dialog
                  v-model="dialogBlur"
                  title="背景模糊"
                  backgroundBlur
              >
                背景将被模糊处理。
              </t-dialog>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">遮罩可选择模糊 / 暗色。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('background')">
                  {{ codeVisible.background ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('background')">
                  {{ copyState.background ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.background" class="code-block">
<code class="code-text">{{ codeSnippets.background }}</code>
              </pre>
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
                <td>是否显示</td>
                <td><code>boolean</code></td>
                <td>false</td>
              </tr>

              <tr>
                <td><code>title</code></td>
                <td>标题文字</td>
                <td><code>string</code></td>
                <td>-</td>
              </tr>

              <tr>
                <td><code>showClose</code></td>
                <td>是否显示关闭按钮</td>
                <td><code>boolean</code></td>
                <td>true</td>
              </tr>

              <tr>
                <td><code>backgroundBlur</code></td>
                <td>是否开启背景模糊</td>
                <td><code>boolean</code></td>
                <td>false</td>
              </tr>

              <tr>
                <td><code>doubleButton</code></td>
                <td>是否显示取消按钮</td>
                <td><code>boolean</code></td>
                <td>false</td>
              </tr>
              </tbody>
            </table>

            <h4 class="api-title">Events</h4>
            <table class="api-table">
              <thead>
              <tr>
                <th>事件名</th>
                <th>说明</th>
                <th>回调参数</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>confirm</code></td>
                <td>点击确定时触发</td>
                <td>-</td>
              </tr>
              <tr>
                <td><code>close</code></td>
                <td>点击关闭按钮 / 取消按钮时触发</td>
                <td>-</td>
              </tr>
              <tr>
                <td><code>overlay</code></td>
                <td>点击遮罩层时触发</td>
                <td>-</td>
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

const showTopBtn = ref(false)
function onScroll(){ showTopBtn.value = window.scrollY > 200 }
function scrollTop(){ window.scrollTo({ top:0, behavior:'smooth' }) }

onMounted(()=> window.addEventListener('scroll', onScroll))
onUnmounted(()=> window.removeEventListener('scroll', onScroll))

const dialogBasic = ref(false)
const dialogDouble = ref(false)
const dialogBlur = ref(false)

type CodeKey = 'basic' | 'double' | 'background'
const codeVisible = ref<Record<CodeKey, boolean>>({
  basic:false, double:false, background:false
})
const copyState = ref<Record<CodeKey, boolean>>({
  basic:false, double:false, background:false
})

function toggleCode(key:CodeKey){
  codeVisible.value[key] = !codeVisible.value[key]
}
async function copyCode(key:CodeKey){
  await navigator.clipboard.writeText(codeSnippets[key])
  copyState.value[key] = true
  setTimeout(()=> copyState.value[key] = false, 1200)
}

const codeSnippets:Record<CodeKey, string> = {
  basic: [
    '<t-button color="blue" @click="visible = true">打开弹窗</t-button>',
    '',
    '<t-dialog v-model="visible" title="提示">',
    '  这是一个基础弹窗。',
    '</t-dialog>',
    '',
    '< script setup >',
    'import { ref } from "vue"',
    'const visible = ref(false)',
    '< /script >'
  ].join('\n'),

  double: [
    '<t-button color="green" @click="open = true">打开弹窗</t-button>',
    '',
    '<t-dialog',
    '  v-model="open"',
    '  title="操作确认"',
    '  doubleButton',
    '>',
    '  你确认要继续吗？',
    '</t-dialog>',
    '',
    '< script setup >',
    'import { ref } from "vue"',
    'const open = ref(false)',
    '< /script >'
  ].join('\n'),

  background: [
    '<t-button color="yellow" @click="blur = true">模糊背景</t-button>',
    '',
    '<t-dialog',
    '  v-model="blur"',
    '  title="背景模糊"',
    '  backgroundBlur',
    '>',
    '  背景将被模糊处理。',
    '</t-dialog>',
    '',
    '< script setup >',
    'import { ref } from "vue"',
    'const blur = ref(false)',
    '< /script >'
  ].join('\n'),
}

const emit = defineEmits(['update-toc'])
const toc = [
  { id: 'basic', title: '基础用法' },
  { id: 'double', title: '双按钮模式' },
  { id: 'background', title: '背景效果' },
  { id: 'api', title: 'API' }
]

onMounted(()=> emit('update-toc', toc))
</script>

<style scoped>
.dialog-main {
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

/* 标题区块 */
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

/* Demo 面板 */
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

/* 代码块动画 */
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

.code-fade-enter-active,
.code-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.code-fade-enter-from,
.code-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* API 卡片 */
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

@media (max-width: 768px) {
  .dialog-main {
    margin: 0 16px;
    padding: 0 8px;
  }
  .box {
    padding: 16px 16px 28px;
  }
}

/* 回到顶部按钮 */
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
  background: rgba(255,255,255,0.45);
  box-shadow: 0 8px 24px rgba(0,0,0,0.20), 0 0 12px rgba(255,255,255,0.55);
}
</style>
