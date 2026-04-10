# Bundle 分析输入参数

## 当前情况
- 打包工具：Webpack 5
- 主包大小：3.2 MB
- 主要依赖：lodash (700KB)、moment (300KB)、echarts (800KB)、antd (500KB)
- 路由数量：约 25 个页面

## 项目特点
- 不需要SEO（后台管理系统）
- 首屏加载要求：3秒内
- 用户网络环境：公司内网（光纤）

## 问题
1. 主包过大，首次加载 8 秒+
2. echarts 和 antd 全量引入
3. lodash 没有按需加载
