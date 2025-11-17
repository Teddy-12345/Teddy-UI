import type { App } from 'vue'

// 导入组件
import Button from './components/Button/Button.vue'
import Input from './components/Input/Input.vue'
import Switch from './components/Switch/Switch.vue'
import Dialog from './components/Dialog/Dialog.vue'
import Message from './components/Message/Message.vue'
import Tab from './components/Tab/Tab.vue'
import Carousel from './components/Carousel/Carousel.vue'
import Tree from './components/Tree/Tree.vue'

// 导出单个组件
export {
    Button,
    Input,
    Switch,
    Dialog,
    Message,
    Tab,
    Carousel,
    Tree
}

// 默认导出 install 方法（用于 app.use(TeddyUI)）
export default {
    install(app: App) {
        app.component('TButton', Button)
        app.component('TInput', Input)
        app.component('TSwitch', Switch)
        app.component('TDialog', Dialog)
        app.component('TMessage', Message)
        app.component('TTabs', Tab)
        app.component('TCarousel', Carousel)
        app.component('TTreeSelect', Tree)
    }
}
