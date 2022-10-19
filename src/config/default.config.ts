enum Size {
  light = 'light',
  dark = 'dark'
}

export default {
  lang: 'zh',
  homePage: '/Dashboard/Analysis', // 主页路由
  iconfontUrl: '//at.alicdn.com/t/font_2362347_541noik27o4.js',
  theme: {
    navMode: 'top', // side 侧边 top 顶部
    primaryColor: '', // 主色调
    fixedHeader: false, // 是否固定头部
    fixSiderbar: false, // 是否固定侧边栏
    headerHeight: 48, // 头部高度
    siderbarTheme: '', // 侧边栏主题 light or dark
    topbarTheme: Size.dark // 顶部栏主题 light or dark
  },
  multiTab: false // 是否启用多页签方式，此时默认路由页面全部启用缓存，在非启用多页签下 通过路由配置keepAlive设置指定页面是否启用缓存
};
