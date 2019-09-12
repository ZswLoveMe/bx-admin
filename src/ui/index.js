// CSS 库
import './lib/index.scss'

// 组件
import components from './components/index'

const install = function (Vue) {

  components(Vue)


};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


export default {
  version: '1.0.0',
  install
}


