<template>
  <div class="message-page">
    <button id="backToTop" :class="{ show: showTopBtn }" @click="scrollTop">↑</button>

    <div class="message-main">
      <h2 class="main-title">Message 消息提示</h2>
      <p class="sub-title">轻量级全局消息提示组件。</p>

      <div class="box">
        <section class="section" id="basic">
          <h3 class="section-title">基础用法</h3>

          <div class="demo-card">
            <div class="demo-preview">
              <t-button color="blue" @click="showInfo">Info</t-button>
              <t-button color="green" @click="showSuccess">Success</t-button>
              <t-button color="yellow" @click="showWarning">Warning</t-button>
              <t-button color="red" @click="showError">Error</t-button>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">调用全局消息提示。</span>
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

        <section class="section" id="duration">
          <h3 class="section-title">自定义时长</h3>

          <div class="demo-card">
            <div class="demo-preview">
              <t-button color="blue" @click="showShort">短提示（1s）</t-button>
              <t-button color="green" @click="showLong">长提示（5s）</t-button>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">可设置显示时长。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('duration')">
                  {{ codeVisible.duration ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('duration')">
                  {{ copyState.duration ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.duration" class="code-block">
<code class="code-text">{{ codeSnippets.duration }}</code>
              </pre>
            </transition>
          </div>
        </section>

        <section class="section" id="loading">
          <h3 class="section-title">加载中提示</h3>

          <div class="demo-card">
            <div class="demo-preview">
              <t-button color="white" @click="showLoading">Loading</t-button>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">展示加载进度。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('loading')">
                  {{ codeVisible.loading ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('loading')">
                  {{ copyState.loading ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.loading" class="code-block">
<code class="code-text">{{ codeSnippets.loading }}</code>
              </pre>
            </transition>
          </div>
        </section>

        <section class="section" id="api">
          <h3 class="section-title">API</h3>

          <div class="api-card">
            <table class="api-table">
              <thead>
              <tr>
                <th>方法</th>
                <th>说明</th>
                <th>参数</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>message.info</td>
                <td>普通提示</td>
                <td>(text, duration?)</td>
              </tr>
              <tr>
                <td>message.success</td>
                <td>成功提示</td>
                <td>(text, duration?)</td>
              </tr>
              <tr>
                <td>message.warning</td>
                <td>警告提示</td>
                <td>(text, duration?)</td>
              </tr>
              <tr>
                <td>message.error</td>
                <td>错误提示</td>
                <td>(text, duration?)</td>
              </tr>
              <tr>
                <td>message.loading</td>
                <td>加载状态</td>
                <td>(text, duration?)</td>
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
import { message } from '../components/Message'

const showTopBtn = ref(false)
function onScroll() { showTopBtn.value = window.scrollY > 200 }
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function showInfo() { message.info('这是一个 Info 提示') }
function showSuccess() { message.success('操作成功') }
function showWarning() { message.warning('请注意相关信息') }
function showError() { message.error('操作失败') }
function showShort() { message.info('1 秒提示', 1000) }
function showLong() { message.success('5 秒提示', 5000) }
function showLoading() { message.loading('加载中...', 3000) }

const codeVisible = ref({ basic: false, duration: false, loading: false })
const copyState = ref({ basic: false, duration: false, loading: false })

function toggleCode(key: string) { codeVisible.value[key] = !codeVisible.value[key] }
async function copyCode(key: string) {
  await navigator.clipboard.writeText(codeSnippets[key])
  copyState.value[key] = true
  setTimeout(() => (copyState.value[key] = false), 1200)
}

const codeSnippets = {
  basic: [
    "message.info('普通提示')",
    "message.success('成功提示')",
    "message.warning('警告提示')",
    "message.error('错误提示')"
  ].join('\n'),

  duration: [
    "message.info('1 秒提示', 1000)",
    "message.success('5 秒提示', 5000)"
  ].join('\n'),

  loading: [
    "message.loading('加载中...')"
  ].join('\n')
}

const emit = defineEmits(['update-toc'])
const toc = [
  { id: 'basic', title: '基础用法' },
  { id: 'duration', title: '自定义时长' },
  { id: 'loading', title: '加载中提示' },
  { id: 'api', title: 'API' }
]

onMounted(() => emit('update-toc', toc))
</script>

<style scoped>
.message-main {
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
.section-title { font-size: 20px; font-weight: 700; margin-bottom: 8px; }

.demo-card {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 16px 18px 10px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
}

.demo-preview {
  display: flex;
  gap: 12px 16px;
  margin-bottom: 10px;
}

.demo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.demo-tip { font-size: 12px; color: #777; }

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
  background: rgba(255,255,255,0.95);
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: .2s;
}

.code-toggle:hover,
.code-copy:hover {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
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

.api-card {
  margin-top: 8px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 16px 18px;
  border: 1px solid rgba(0,0,0,0.04);
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.api-table th,
.api-table td {
  padding: 6px 8px;
  text-align: left;
  border-bottom: 1px solid rgba(0,0,0,0.06);
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
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  transition: opacity .35s ease, transform .25s ease;
}

#backToTop.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

#backToTop:hover {
  transform: translateY(-4px);
  background: rgba(255,255,255,0.45);
}
</style>
