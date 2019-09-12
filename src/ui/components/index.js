/*统一注册全局组件*/

import SearchInputBtn from "./SearchInputBtn"
import richText from "./rich-text"
import Pagination from "./Pagination"

export default function (Vue) {
  Vue.component('zsw-search-input-btn',SearchInputBtn)
  Vue.component('zsw-pagination',Pagination)
  Vue.component('zsw-rich-text',richText)
}
