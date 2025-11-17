<template>
  <div class="tree-page">
    <button
        id="backToTop"
        :class="{ show: showTopBtn }"
        @click="scrollTop"
    >
      ↑
    </button>

    <div class="tree-main">
      <h2 class="main-title">Tree 树形控件</h2>
      <p class="sub-title">用于展示分层结构数据，支持展开、选择、半选以及自定义内容。</p>

      <div class="box">

        <section class="section" id="basic">
          <h3 class="section-title">基础用法</h3>
          <p class="section-desc">
            使用 <code>&lt;t-tree&gt;</code> 展示树形结构。
          </p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-tree :data="demo1" defaultExpandAll />
            </div>

            <div class="demo-footer">
              <span class="demo-tip">最基本的树结构展示。</span>
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

        <section class="section" id="select">
          <h3 class="section-title">可选择（带 checkbox）</h3>
          <p class="section-desc">
            通过 <code>selectable</code> 开启节点选择。
          </p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-tree
                  :data="demo1"
                  selectable
                  defaultExpandAll
                  @select-change="onSelectChange"
              />
            </div>

            <div class="demo-footer">
              <span class="demo-tip">支持父子联动、半选。</span>
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

        <section class="section" id="custom">
          <h3 class="section-title">自定义内容</h3>
          <p class="section-desc">
            使用 <code>v-slot:label</code> 自定义节点显示内容。
          </p>

          <div class="demo-card">
            <div class="demo-preview">
              <t-tree :data="demo1" defaultExpandAll>
                <template #label="{ nodeLabel, level }">
                  <span :style="{ color: level === 0 ? '#409eff' : '#222' }">
                    ⭐ {{ nodeLabel }}
                  </span>
                </template>
              </t-tree>
            </div>

            <div class="demo-footer">
              <span class="demo-tip">可根据层级自定义样式。</span>
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
                <td><code>data</code></td>
                <td>树数据</td>
                <td><code>TreeNodeData[]</code></td>
                <td>-</td>
              </tr>
              <tr>
                <td><code>selectable</code></td>
                <td>是否支持选择</td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
              </tr>
              <tr>
                <td><code>defaultExpandAll</code></td>
                <td>默认展开所有节点</td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
              </tr>
              <tr>
                <td><code>defaultSelectedKeys</code></td>
                <td>默认选中节点</td>
                <td><code>Key[]</code></td>
                <td><code>[]</code></td>
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
                <td><code>node-click</code></td>
                <td>点击节点触发</td>
                <td><code>{ node, key }</code></td>
              </tr>
              <tr>
                <td><code>select-change</code></td>
                <td>选择变化触发</td>
                <td><code>{ checkedKeys, indeterminateKeys }</code></td>
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
                <td><code>label</code></td>
                <td>自定义节点显示内容</td>
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
import Tree from './../components/Tree/Tree.vue'

defineOptions({
  components: {
    't-tree': Tree
  }
})

function onSelectChange(e) {
  console.log(e)
}

const demo1 = [
  {
    id: 1,
    label: '文档',
    children: [
      { id: 2, label: '介绍.md' },
      { id: 3, label: '快速开始.md' },
      {
        id: 4,
        label: '指南',
        children: [
          { id: 5, label: '安装.md' },
          { id: 6, label: '主题定制.md' }
        ]
      }
    ]
  }
]

const showTopBtn = ref(false)
function onScroll() {
  showTopBtn.value = window.scrollY > 200
}
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

type CodeKey = 'basic' | 'select' | 'custom'

const codeVisible = ref<Record<CodeKey, boolean>>({
  basic: false,
  select: false,
  custom: false
})

const copyState = ref<Record<CodeKey, boolean>>({
  basic: false,
  select: false,
  custom: false
})

function toggleCode(key: CodeKey) {
  codeVisible.value[key] = !codeVisible.value[key]
}

async function copyCode(key: CodeKey) {
  await navigator.clipboard.writeText(codeSnippets[key])
  copyState.value[key] = true
  setTimeout(() => (copyState.value[key] = false), 1200)
}

const codeSnippets: Record<CodeKey, string> = {
  basic: [
    '<t-tree :data="treeData" defaultExpandAll />',
    '',
    '< script setup >',
    'const treeData = [',
    '  { id:1, label:"文档", children:[',
    '      { id:2, label:"介绍.md" },',
    '      { id:3, label:"快速开始.md" },',
    '      { id:4, label:"指南", children:[',
    '          { id:5, label:"安装.md" },',
    '          { id:6, label:"主题定制.md" }',
    '      ]}',
    '  ]}',
    ']',
    '< /script >'
  ].join('\n'),

  select: [
    '<t-tree',
    '  :data="treeData"',
    '  selectable',
    '  defaultExpandAll',
    '  @select-change="onSelectChange"',
    '/>',
    '',
    '< script setup >',
    'function onSelectChange(e){',
    '  console.log(e)',
    '}',
    '',
    'const treeData = [',
    '  { id:1, label:"文档", children:[',
    '      { id:2, label:"介绍.md" },',
    '      { id:3, label:"快速开始.md" },',
    '      { id:4, label:"指南", children:[',
    '          { id:5, label:"安装.md" },',
    '          { id:6, label:"主题定制.md" }',
    '      ]}',
    '  ]}',
    ']',
    '< /script >'
  ].join('\n'),

  custom: [
    '<t-tree :data="treeData" defaultExpandAll>',
    '  <template #label="{ nodeLabel, level }">',
    '    <span :style="{ color: level === 0 ? \'#409eff\' : \'#222\' }">',
    '      ⭐ {{ nodeLabel }}',
    '    </span>',
    '  </template>',
    '</t-tree>',
    '',
    '< script setup >',
    'const treeData = [',
    '  { id:1, label:"文档", children:[',
    '      { id:2, label:"介绍.md" },',
    '      { id:3, label:"快速开始.md" },',
    '      { id:4, label:"指南", children:[',
    '          { id:5, label:"安装.md" },',
    '          { id:6, label:"主题定制.md" }',
    '      ]}',
    '  ]}',
    ']',
    '< /script >'
  ].join('\n')
}

const emit = defineEmits(['update-toc'])
const toc = [
  { id: 'basic', title: '基础用法' },
  { id: 'select', title: '可选择' },
  { id: 'custom', title: '自定义内容' },
  { id: 'api', title: 'API' }
]

onMounted(() => emit('update-toc', toc))
</script>

<style scoped>
.tree-main {
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

/* section */
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

/* demo */
.demo-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 16px 18px 10px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
}
.demo-preview {
  margin-bottom: 10px;
}
.demo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
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
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  font-size: 12px;
}

/* code */
.code-block {
  margin-top: 8px;
  padding: 10px 14px;
  border-radius: 14px;
  background: #111;
  color: #f5f5f5;
  font-size: 12px;
  overflow-x: auto;
  line-height: 1.6;
}
.code-text {
  white-space: pre;
}
.code-fade-enter-active,
.code-fade-leave-active {
  transition: 0.25s ease;
}
.code-fade-enter-from,
.code-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* API */
.api-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.04);
}
.api-title {
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0 6px;
}
.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-bottom: 10px;
}
.api-table td,
.api-table th {
  padding: 6px 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.api-table th {
  background: rgba(255,255,255,0.9);
  font-weight: 600;
}

#backToTop {
  position: fixed;
  right: 10%;
  bottom: 40px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: 0.25s ease;
}
#backToTop.show {
  opacity: 1;
  pointer-events: auto;
}
#backToTop:hover {
  transform: translateY(-4px);
  background: rgba(255,255,255,0.45);
}
</style>

