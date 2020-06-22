module.exports = {

  /// 监听页面挂载，加入路由列表
  mounted() {
    if (!window.globalRouterList) {
      window.globalRouterList = new Set()
    }

    if (!this.$router){
      return
    }

    window.globalRouterList.add(this.$router.history.current.name)
  },

  /// 初始化赋值keepAlive为true
  beforeRouteEnter(to, from, next) {
    if (!to.meta) {
      to.meta = {}
      to.meta['keepAlive'] = true
    }
    to.meta.keepAlive = true
    next()
  },
  beforeRouteLeave(to, from, next) {

    let needEraseCurrentRoute = false;

    /// 判断是否需要删除当前路由缓存
    window.globalRouterList && window.globalRouterList.forEach((item => {
      if (item == to.name) {
        window.globalRouterList.delete(from.name)
        window.currentToDeletePath = from.name
        needEraseCurrentRoute = true;
      }
    }))

    if (needEraseCurrentRoute) {
      const { parent, componentOptions, key } = this.$vnode

      /// 缓存起来的当前路由key
      const cacheCompKey = !key ?
        componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : key

      // 全局路由缓存
      const cache = parent.componentInstance.cache

      /// 删掉全局缓存
      cache && cache[cacheCompKey] && (delete cache[cacheCompKey])
      this.$destroy()
    }

    next()
  }
}