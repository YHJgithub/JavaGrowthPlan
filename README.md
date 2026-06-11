# Java 成长路线图

面向 **1 年+ Java 后端经验** 的 9–10 个月进阶计划，以 40 周、5 个阶段组织学习路径。纯静态页面，支持任务勾选、进度追踪与主题切换，进度保存在浏览器本地。

## 在线体验

**[https://yhjgithub.github.io/JavaGrowthPlan/](https://yhjgithub.github.io/JavaGrowthPlan/)**

## 功能

- 5 阶段路线图，按周划分章节与任务
- 必做 / 选做 / 实践 / 并行任务标签
- 每章节附带推荐学习资源链接
- 整体与分阶段进度统计
- 深色 / 浅色 / 跟随系统主题
- 进度自动保存至 `localStorage`（刷新不丢失）

## 学习阶段

| 阶段 | 主题 | 周期 |
|------|------|------|
| Phase 1 | Java + Spring 核心夯实 | Month 1–2 · 8 周 |
| Phase 2 | 基础设施 + 数据库 + JVM | Month 2.5–4.5 · 9 周 |
| Phase 3 | 个人微服务项目 | Month 5–7 · 11 周 |
| Phase 4 | 深度技术提升 | Month 7.5–8.5 · 6 周 |
| Phase 5 | 求职冲刺 | Month 8.5–10 · 6 周 |

技术栈侧重：**JDK 17 · Spring Boot 3 · Spring Cloud Alibaba**

## 项目结构

```
JavaGrowthPlan/
├── index.html          # 页面入口
├── css/
│   └── styles.css      # 样式
└── js/
    ├── theme-init.js   # 主题初始化（防闪烁）
    ├── data.js         # 路线图数据
    └── app.js          # 交互与渲染逻辑
```

## 本地运行

无需构建工具，克隆后直接打开 `index.html` 即可。若本地脚本加载异常，可用任意静态 HTTP 服务访问，例如：

```bash
npx serve .
```

或使用 VS Code / Cursor 的 Live Server 插件。
