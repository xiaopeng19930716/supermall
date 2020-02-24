import Vue from 'vue'

const debounce = (func, time, ctx, immediate) => {
  let timer
  const rtn = (...params) => {
    clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, time)
      if (callNow) func.apply(ctx, params)
    } else {
      timer = setTimeout(() => {
        func.apply(ctx, params)
      }, time)
    }
  }
  return rtn
}

Vue.component('Debounce', {
  abstract: true,
  props: ['time', 'events', 'immediate'],
  created() {
    this.eventKeys = this.events && this.events.split(',')
  },
  render() {
    const vnode = this.$slots.default[0]
    // 如果默认没有传 events，则对所有绑定事件加上防抖
    if (!this.eventKeys) {
      this.eventKeys = Object.keys(vnode.data.on)
    }
    this.eventKeys.forEach(key => {
      vnode.data.on[key] = debounce(
        vnode.data.on[key],
        this.time,
        vnode,
        this.immediate
      )
    })
    return vnode
  }
})
