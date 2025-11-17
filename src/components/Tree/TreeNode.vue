<template>
  <div class="t-tree-node">
    <div
        class="t-tree-node__content"
        :class="contentClass"
        @click="onClickNode"
    >
    <!-- 方形 checkbox（Element 风格） -->
    <div
        class="t-tree-checkbox"
        :class="{
          'is-checked': isSelected,
          'is-indeterminate': isIndeterminate
        }"
        @click.stop="onSelect"
    ></div>

  <!-- 文本区域：不处理选中，只展示 -->
  <div class="t-tree-node__label">
    <slot
        name="label"
        :node="node"
        :nodeLabel="nodeLabel"
        :level="level"
        :expanded="isExpanded"
        :selected="isSelected"
    >
      {{ nodeLabel }}
    </slot>
  </div>
  </div>

  <!-- 子节点 -->
  <transition name="t-tree-collapse">
    <div
        v-if="isExpanded && hasChildren"
        class="t-tree-node__children"
    >
      <TreeNode
          v-for="child in children"
          :key="getKey(child)"
          :node="child"
          :level="level + 1"
          :get-key="getKey"
          :get-label="getLabel"
          :get-children="getChildren"
          :expanded-keys="expandedKeys"
          :selected-keys="selectedKeys"
          :indeterminate-keys="indeterminateKeys"
          :selectable="selectable"
          :multiple="multiple"
          @toggle="$emit('toggle', $event)"
          @select="$emit('select', $event)"
          @node-click="$emit('node-click', $event)"
      >
        <template #label="slotProps">
          <slot name="label" v-bind="slotProps" />
        </template>
      </TreeNode>
    </div>
  </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TreeNodeData, Key } from './Tree.vue'

const props = defineProps<{
  node: TreeNodeData
  level: number
  getKey: (node: TreeNodeData) => Key
  getLabel: (node: TreeNodeData) => string
  getChildren: (node: TreeNodeData) => TreeNodeData[]
  expandedKeys: Set<Key>
  selectedKeys: Set<Key>
  indeterminateKeys: Set<Key>
  selectable?: boolean
  multiple?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', payload: { node: TreeNodeData; key: Key }): void
  (e: 'select', payload: { node: TreeNodeData; key: Key }): void
  (e: 'node-click', payload: { node: TreeNodeData; key: Key }): void
}>()

const key = computed(() => props.getKey(props.node))
const nodeLabel = computed(() => props.getLabel(props.node))
const children = computed(() => props.getChildren(props.node))
const hasChildren = computed(() => children.value && children.value.length > 0)

const isExpanded = computed(() => props.expandedKeys.has(key.value))
const isSelected = computed(() => props.selectedKeys.has(key.value))
const isIndeterminate = computed(() => props.indeterminateKeys.has(key.value))
const isDisabled = computed(() => !!props.node.disabled)

const contentClass = computed(() => [
  `t-tree-node--level-${props.level}`,
  {
    'is-expanded': isExpanded.value,
    'is-selected': isSelected.value,
    'is-disabled': isDisabled.value
  }
])

// 整行：只展开/收起 + 派发 node-click
function onClickNode() {
  if (hasChildren.value) {
    emit('toggle', { node: props.node, key: key.value })
  }
  emit('node-click', { node: props.node, key: key.value })
}

// 只负责选中/取消，不展开
function onSelect() {
  if (!props.selectable || isDisabled.value) return
  emit('select', { node: props.node, key: key.value })
}
</script>

<style scoped>
.t-tree-node {
  font-size: 14px;
  color: inherit;
}

.t-tree-node__content {
  display: flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 10px;
  margin: 1px 4px;
  cursor: pointer;
  user-select: none;
  transition: none;
}

/* 缩进：用 level 做左 padding */
[class*='t-tree-node--level-'] {
  padding-left: calc(var(--t-tree-indent, 16px) * 1);
}
.t-tree-node--level-1 { padding-left: calc(var(--t-tree-indent, 16px) * 2); }
.t-tree-node--level-2 { padding-left: calc(var(--t-tree-indent, 16px) * 3); }
.t-tree-node--level-3 { padding-left: calc(var(--t-tree-indent, 16px) * 4); }

/* hover / select 动效全去掉 */
.t-tree-node__content:hover:not(.is-disabled) {
  background: transparent;
  box-shadow: none;
  transform: none;
}
.t-tree-node__content.is-selected {
  background: transparent;
  box-shadow: none;
  transform: none;
}

.t-tree-node__content.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Element 风格 checkbox */
.t-tree-checkbox {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  margin-right: 6px;
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
}

/* 选中：蓝底 + 白勾 */
.t-tree-checkbox.is-checked {
  border-color: #409eff;
  background-color: #409eff;
}
.t-tree-checkbox.is-checked::after {
  content: '';
  position: absolute;
  left: 3px;
  top: 1px;
  width: 6px;
  height: 10px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
  box-sizing: border-box;
}

/* 半选：蓝底 + 白横杠 */
.t-tree-checkbox.is-indeterminate {
  border-color: #409eff;
  background-color: #409eff;
}
.t-tree-checkbox.is-indeterminate::after {
  content: '';
  position: absolute;
  left: 2px;
  right: 2px;
  top: 5px;
  height: 2px;
  background-color: #fff;
  border-radius: 2px;
  box-sizing: border-box;
}

/* 文本区域：不加粗、不改变字号 */
.t-tree-node__label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: inherit;
}

/* 子节点容器 */
.t-tree-node__children {
  margin-left: 0;
}

/* 展开收起动画 */
.t-tree-collapse-enter-from,
.t-tree-collapse-leave-to {
  max-height: 0;
  opacity: 0;
}
.t-tree-collapse-enter-to,
.t-tree-collapse-leave-from {
  max-height: 400px;
  opacity: 1;
}
.t-tree-collapse-enter-active,
.t-tree-collapse-leave-active {
  overflow: hidden;
  transition:
      max-height 0.18s ease,
      opacity 0.18s ease;
}
</style>
