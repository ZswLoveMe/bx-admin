const History = {
  _history: [], // 历史记录堆栈
  install(Vue) {
    // 提供Vue插件所需安装方法
    Object.defineProperty(Vue.prototype, "$routerHistory", {
      get() {
        return History
      }
    })
  },
  push(path) { // 入栈

    this._history.push(path)
    console.log(" this._history：", this._history)
    this._history = this.wipeRepetition(this._history, "name")


  },
  pop(path) {
    console.log("pop", path)
    this._history = this._history.filter(item => item.name != path.name)
  },
  canBack() {
    return this._history.length > 0
  },
  wipeRepetition(targetArray, id) {
    let arr = []
    targetArray.forEach((supplier, index) => {
      let flag = true
      if (arr.length >= 1) {
        arr.forEach(item => {
          if (item[id] == supplier[id]) {
            flag = false
          }
        })
      }
      if (flag) {
        arr.push(targetArray[index])
      }
    })

    //检查数组中 是否 有 空对象
    if (arr.length > 1) {
      arr.forEach((item, index) => {
        if (typeof (item[id]) == "undefined") {
          arr.splice(index, 1)
        }
      })
    }
    return arr
  }
}


export default History
