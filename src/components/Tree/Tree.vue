<template>
  <div class="t-tree">
    <TreeNode
        v-for="root in data"
        :key="getKey(root)"
        :node="root"
        :level="0"
        :get-key="getKey"
        :get-label="getLabel"
        :get-children="getChildren"
        :expanded-keys="expandedKeys"
        :selected-keys="selectedKeys"
        :indeterminate-keys="indeterminateKeys"
        :selectable="selectable"
        :multiple="multiple"
        @toggle="handleToggle"
        @select="handleSelect"
        @node-click="payload => emit('node-click', payload)"
    >
      <template #label="slotProps">
        <!-- 默认直接显示 label，不加粗、不改大小 -->
        <slot name="label" v-bind="slotProps">
          {{ slotProps.nodeLabel }}
        </slot>
      </template>
    </TreeNode>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import TreeNode from './TreeNode.vue'

export type Key = string | number

export interface TreeNodeData {
  [key: string]: any
}

const props = defineProps<{
  data: TreeNodeData[]
  nodeKey?: string          // id 字段名，默认 'id'
  labelKey?: string         // label 字段名，默认 'label'
  childrenKey?: string      // children 字段名，默认 'children'
  selectable?: boolean      // 是否可选
  multiple?: boolean        // 是否多选（目前逻辑本身就是多选）
  defaultExpandAll?: boolean
  defaultExpandedKeys?: Key[]
  defaultSelectedKeys?: Key[]
}>()

const emit = defineEmits<{
  (e: 'node-click', payload: { node: TreeNodeData; key: Key }): void
  (e: 'select-change', payload: { checkedKeys: Key[]; indeterminateKeys: Key[] }): void
}>()

/* ----------------- 工具字段 ----------------- */
const nodeKey = computed(() => props.nodeKey || 'id')
const labelKey = computed(() => props.labelKey || 'label')
const childrenKey = computed(() => props.childrenKey || 'children')

function getKey(node: TreeNodeData): Key {
  return node[nodeKey.value] as Key
}
function getLabel(node: TreeNodeData): string {
  return node[labelKey.value] as string
}
function getChildren(node: TreeNodeData): TreeNodeData[] {
  return (node[childrenKey.value] as TreeNodeData[]) || []
}

/* ----------------- 状态：展开 / 选中 / 半选 ----------------- */
const expandedKeys = reactive(new Set<Key>()) as Set<Key>
const selectedKeys = reactive(new Set<Key>()) as Set<Key>
const indeterminateKeys = reactive(new Set<Key>()) as Set<Key>

/* 初始化展开状态 */
function initExpanded() {
  if (props.defaultExpandAll) {
    const dfs = (nodes: TreeNodeData[]) => {
      nodes.forEach(n => {
        const key = getKey(n)
        expandedKeys.add(key)
        const children = getChildren(n)
        if (children && children.length) dfs(children)
      })
    }
    dfs(props.data)
  }
  if (props.defaultExpandedKeys) {
    props.defaultExpandedKeys.forEach(k => expandedKeys.add(k))
  }
}

/* 初始化选中状态 */
function initSelected() {
  if (props.defaultSelectedKeys) {
    props.defaultSelectedKeys.forEach(k => selectedKeys.add(k))
    updateParentStates()
  }
}

/* 直接在 setup 阶段初始化一次（数据通常是静态的） */
initExpanded()
initSelected()

/* ----------------- 展开 / 收起 ----------------- */
function handleToggle({ key }: { node: TreeNodeData; key: Key }) {
  if (expandedKeys.has(key)) expandedKeys.delete(key)
  else expandedKeys.add(key)
}

/* ----------------- 选中 / 取消（带父子联动） ----------------- */
function handleSelect({ node, key }: { node: TreeNodeData; key: Key }) {
  const checked = selectedKeys.has(key)

  if (checked) {
    uncheckNodeDeep(node)
  } else {
    checkNodeDeep(node)
  }

  updateParentStates()
  emit('select-change', {
    checkedKeys: Array.from(selectedKeys),
    indeterminateKeys: Array.from(indeterminateKeys)
  })
}

/* 递归选中当前节点及所有子孙 */
function checkNodeDeep(node: TreeNodeData) {
  const key = getKey(node)
  selectedKeys.add(key)
  indeterminateKeys.delete(key)

  const children = getChildren(node)
  if (children && children.length) {
    children.forEach(child => checkNodeDeep(child))
  }
}

/* 递归取消当前节点及所有子孙 */
function uncheckNodeDeep(node: TreeNodeData) {
  const key = getKey(node)
  selectedKeys.delete(key)
  indeterminateKeys.delete(key)

  const children = getChildren(node)
  if (children && children.length) {
    children.forEach(child => uncheckNodeDeep(child))
  }
}

/* ----------------- 父节点三态计算（checked / indeterminate / none） ----------------- */
function updateParentStates() {
  function dfs(node: TreeNodeData): 'checked' | 'indeterminate' | 'none' {
    const key = getKey(node)
    const children = getChildren(node)

    // 叶子节点
    if (!children || children.length === 0) {
      return selectedKeys.has(key) ? 'checked' : 'none'
    }

    let allChecked = true
    let noneChecked = true

    for (const child of children) {
      const state = dfs(child)
      if (state !== 'checked') allChecked = false
      if (state !== 'none') noneChecked = false
    }

    if (allChecked) {
      selectedKeys.add(key)
      indeterminateKeys.delete(key)
      return 'checked'
    } else if (noneChecked) {
      selectedKeys.delete(key)
      indeterminateKeys.delete(key)
      return 'none'
    } else {
      selectedKeys.delete(key)
      indeterminateKeys.add(key)
      return 'indeterminate'
    }
  }

  props.data.forEach(root => dfs(root))
}
</script>

<style scoped>
.t-tree {
  padding: 4px 0;
  font-size: 14px;
  color: inherit;
}
</style>
