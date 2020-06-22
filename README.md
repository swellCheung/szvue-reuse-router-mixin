# szvue-reuse-router-mixin
基于vue路由缓存管理插件。监听路由钩子，在路由变化时匹配路径，删除路由缓存

*本插件基于vue进行二次扩展

1、app.vue用<keep-alive>标签包裹<router-view>

![Image text](https://github.com/swellCheung/szvue-reuse-router-mixin/blob/master/assets/keep-alive%E9%85%8D%E7%BD%AE.png)

2、在main.js中以mixin的形式挂载到全局vue对象。

![Image text](https://github.com/swellCheung/szvue-reuse-router-mixin/blob/master/assets/%E4%BD%BF%E7%94%A8.png)
