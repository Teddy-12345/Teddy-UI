<template>
  <div class="button-page">
    <button
        id="backToTop"
        :class="{ show: showTopBtn }"
        @click="scrollTop"
    >
      ↑
    </button>
    <div class="button-main">

      <h2 class="main-title">Button 按钮</h2>
      <p class="sub-title">按钮用于触发操作和提交请求。</p>

      <!-- 整体白色毛玻璃底板 -->
      <div class="box">
        <!-- 一、基础用法 -->
        <section class="section" id="basic">
          <h3 class="section-title">基础用法</h3>
          <p class="section-desc">
            使用 <code>&lt;t-button&gt;</code> 创建按钮，通过 <code>color</code> 控制主题色。
          </p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-button>默认按钮</t-button>
              <t-button color="blue">蓝色按钮</t-button>
              <t-button color="red">红色按钮</t-button>
              <t-button color="green">绿色按钮</t-button>
              <t-button color="yellow">黄色按钮</t-button>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">基础按钮示例。</span>
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

        <!-- 二、选择按钮（非受控） -->
        <section class="section" id="select">
          <h3 class="section-title">选择按钮（非受控）</h3>
          <p class="section-desc">
            当 <code>type="select"</code> 且未使用 <code>v-model</code> 时，组件内部管理选中状态。
          </p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-button
                  type="select"
                  color="blue"
                  @click="onInnerSelectClick"
              >
                点我切换选中
              </t-button>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">
                点击事件参数附带 <code>event.selected</code>。
              </span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('select')">
                  {{ codeVisible.select ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('select')">
                  {{ copyState.select ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.select" class="code-block">
<code class="code-text">{{ codeSnippets.select }}</code>
              </pre>
            </transition>
          </div>
        </section>

        <!-- 三、选择按钮（受控 v-model） -->
        <section class="section" id="vmodel">
          <h3 class="section-title">受控模式 v-model</h3>
          <p class="section-desc">
            使用 <code>v-model</code> 控制选中状态，适合表单和筛选场景。
          </p>

          <div class="demo-card">
            <div class="demo-preview demo-preview-column">
              <div class="demo-row">
                <t-button type="select" color="blue" v-model="selectOne">
                  选项 A
                </t-button>
                <t-button type="select" color="green" v-model="selectTwo">
                  选项 B
                </t-button>
                <t-button type="select" color="red" v-model="selectThree">
                  选项 C
                </t-button>
              </div>

              <div class="demo-state">
                当前状态：
                <code>{ A: {{ selectOne }}, B: {{ selectTwo }}, C: {{ selectThree }} }</code>
              </div>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">
                与 <code>update:modelValue</code> 联动。
              </span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('vModel')">
                  {{ codeVisible.vModel ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('vModel')">
                  {{ copyState.vModel ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.vModel" class="code-block">
<code class="code-text">{{ codeSnippets.vModel }}</code>
              </pre>
            </transition>
          </div>
        </section>

        <!-- 四、圆形按钮 -->
        <section class="section" id="circle">
          <h3 class="section-title">圆形按钮</h3>
          <p class="section-desc">
            设置 <code>circle</code> 为 <code>true</code> 时按钮为圆形，通过 <code>diameter</code> 指定直径。
          </p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-button circle color="blue">+</t-button>
              <t-button circle color="green" :diameter="48">✓</t-button>
              <t-button circle color="red" :diameter="56">!</t-button>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">适用于图标按钮和浮动操作按钮。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('circle')">
                  {{ codeVisible.circle ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('circle')">
                  {{ copyState.circle ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.circle" class="code-block">
<code class="code-text">{{ codeSnippets.circle }}</code>
              </pre>
            </transition>
          </div>
        </section>

        <!-- 五、原生属性透传 -->
        <section class="section" id="native">
          <h3 class="section-title">原生属性透传</h3>
          <p class="section-desc">
            组件内部通过 <code>v-bind="$attrs"</code> 将未声明属性透传至原生
            <code>&lt;button&gt;</code>。
          </p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-button color="blue" type="button">普通按钮</t-button>
              <t-button color="green" type="submit">提交按钮</t-button>
              <t-button color="red" disabled>禁用按钮</t-button>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">支持所有原生 button 属性。</span>
              <div class="demo-actions">
                <button class="code-toggle" @click="toggleCode('native')">
                  {{ codeVisible.native ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="code-copy" @click="copyCode('native')">
                  {{ copyState.native ? '已复制' : '复制代码' }}
                </button>
              </div>
            </div>

            <transition name="code-fade">
              <pre v-if="codeVisible.native" class="code-block">
                <code class="code-text">{{ codeSnippets.native }}</code>
              </pre>
            </transition>
          </div>
        </section>

        <!-- API 文档 -->
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
                <td><code>color</code></td>
                <td>按钮颜色主题</td>
                <td><code>'red' | 'yellow' | 'blue' | 'green' | 'white'</code></td>
                <td><code>'white'</code></td>
              </tr>
              <tr>
                <td><code>type</code></td>
                <td>按钮类型</td>
                <td><code>'click' | 'select'</code></td>
                <td><code>'click'</code></td>
              </tr>
              <tr>
                <td><code>modelValue</code></td>
                <td>选中状态，配合 <code>v-model</code> 使用，仅在 <code>type="select"</code> 时生效</td>
                <td><code>boolean</code></td>
                <td><code>undefined</code></td>
              </tr>
              <tr>
                <td><code>circle</code></td>
                <td>是否为圆形按钮</td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
              </tr>
              <tr>
                <td><code>diameter</code></td>
                <td>圆形按钮直径（px）</td>
                <td><code>number | string</code></td>
                <td><code>40</code></td>
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
                <td><code>click</code></td>
                <td>点击时触发；在 <code>type="select"</code> 下附带 <code>selected</code> 字段</td>
                <td><code>event: MouseEvent &amp; {'{ selected?: boolean }'}</code></td>
              </tr>
              <tr>
                <td><code>update:modelValue</code></td>
                <td>选中状态变化时触发</td>
                <td><code>value: boolean</code></td>
              </tr>
              </tbody>
            </table>

            <h4 class="api-title">Slots</h4>
            <table class="api-table">
              <thead>
              <tr>
                <th>插槽名</th>
                <th>说明</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>default</code></td>
                <td>按钮内容，支持文本和任意节点</td>
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

type CodeKey = 'basic' | 'select' | 'vModel' | 'circle' | 'native'

const codeVisible = ref<Record<CodeKey, boolean>>({
  basic: false,
  select: false,
  vModel: false,
  circle: false,
  native: false
})

const copyState = ref<Record<CodeKey, boolean>>({
  basic: false,
  select: false,
  vModel: false,
  circle: false,
  native: false
})

function toggleCode(key: CodeKey) {
  codeVisible.value[key] = !codeVisible.value[key]
}

async function copyCode(key: CodeKey) {
  try {
    await navigator.clipboard.writeText(codeSnippets[key])
    copyState.value[key] = true
    setTimeout(() => {
      copyState.value[key] = false
    }, 1200)
  } catch (e) {
    console.error('copy failed', e)
  }
}

// demo 状态
const selectOne = ref(false)
const selectTwo = ref(true)
const selectThree = ref(false)

function onInnerSelectClick(event: MouseEvent & { selected?: boolean }) {
  console.log('inner select clicked, selected =', event.selected)
}

// 代码片段
const codeSnippets: Record<CodeKey, string> = {
  basic: `<t-button>默认按钮</t-button>
<t-button color="blue">蓝色按钮</t-button>
<t-button color="red">红色按钮</t-button>
<t-button color="green">绿色按钮</t-button>
<t-button color="yellow">黄色按钮</t-button>`,
  select: `<t-button
  type="select"
  color="blue"
  @click="onInnerSelectClick"
>
  点我切换选中
</t-button>

<script setup lang="ts">
function onInnerSelectClick(event: MouseEvent & { selected?: boolean }) {
  console.log('selected:', event.selected)
}
<\/script>`,
  vModel: `<template>
  <t-button type="select" color="blue" v-model="selectOne">
    选项 A
  </t-button>
  <t-button type="select" color="green" v-model="selectTwo">
    选项 B
  </t-button>
  <t-button type="select" color="red" v-model="selectThree">
    选项 C
  </t-button>

  <div>
    当前状态：
    { A: {{ selectOne }}, B: {{ selectTwo }}, C: {{ selectThree }} }
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectOne = ref(true)
const selectTwo = ref(false)
const selectThree = ref(false)
<\/script>`,
  circle: `<t-button circle color="blue">
  +
</t-button>

<t-button circle color="green" :diameter="48">
  ✓
</t-button>

<t-button circle color="red" :diameter="56">
  !
</t-button>`,
  native: `<t-button color="blue" type="button">
  普通按钮
</t-button>

<t-button color="green" type="submit">
  提交按钮
</t-button>

<t-button color="red" disabled>
  禁用按钮
</t-button>`
}

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
  { id: 'basic', title: '基础用法' },
  { id: 'select', title: '选择按钮（非受控）' },
  { id: 'vmodel', title: '受控模式 v-model' },
  { id: 'circle', title: '圆形按钮' },
  { id: 'native', title: '原生属性透传' },
  { id: 'api', title: 'API' }
]

onMounted(() => {
  emit('update-toc', toc)
})
</script>

<style scoped>
.button-main {
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

/* 区块标题 */
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

/* Demo 面板：白色毛玻璃，无 hover 动效 */
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

.demo-preview-column {
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
}

.demo-state {
  font-size: 12px;
  color: #444;
}

/* Demo 底部区域 */
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
  transition:
      background 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;
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

/* 代码块，可选中复制 */
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
  transition:
      opacity 0.25s ease,
      transform 0.25s ease;
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
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New',
  monospace;
  font-size: 12px;
}

@media (max-width: 768px) {
  .button-main {
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


