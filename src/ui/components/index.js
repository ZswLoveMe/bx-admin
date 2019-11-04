/*统一注册全局组件*/

import SearchInputBtn from "./SearchInputBtn"
import Pagination from "./Pagination"
import title from "./title"
import richText from './rich-text'

export default function (Vue) {
  Vue.component('zsw-search-input-btn',SearchInputBtn)
  Vue.component('zsw-pagination',Pagination)
  Vue.component('zsw-title',title)
  Vue.component('zsw-richText',richText)
}
