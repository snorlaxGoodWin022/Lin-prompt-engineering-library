# Lighthouse 报告解读与优化方案

我跑了一个Lighthouse性能测试，帮我分析报告并给出优化方案。

## 项目信息

- 框架：{React 18/Vue 3/其他}
- 打包工具：{Webpack 5/Vite/Rollup}
- 部署：{Nginx/Apache/其他}

## Lighthouse 得分

- Performance: {分数}
- Accessibility: {分数}
- Best Practices: {分数}
- SEO: {分数}

## 主要问题

```
{粘贴Lighthouse Opportunities和Diagnostics部分}
```

## 分析要求

1. **按优先级排序问题**（影响最大的排前面）
2. **每个问题给出详细分析**：
   - **问题原因** - 用白话解释为什么会出现这个问题
   - **具体优化方案** - 给代码示例或配置修改
   - **预期提升效果** - 预计能提升多少分数或时间
3. **实施难度分类**：
   - **快速优化**（1天内可完成）
   - **中期优化**（1周内可完成）
   - **长期重构**（需要架构调整）
4. **给出优化后预期分数范围** - 预计优化后各项得分

## 输出要求

- 不要给我理论，直接告诉我怎么改代码
- 提供具体的配置文件和代码修改示例
- 区分前端优化和后端/部署优化
- 考虑实际项目约束（团队技能、时间限制等）

---

## 模板说明

此模板用于将 Lighthouse 报告转化为具体的、可执行的优化任务。通过系统化分析，帮助团队优先处理高价值优化项。

### 参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `{React 18/Vue 3/其他}` | 项目使用的框架 | `React 18` |
| `{Webpack 5/Vite/Rollup}` | 打包工具 | `Webpack 5` |
| `{Nginx/Apache/其他}` | 部署服务器 | `Nginx` |
| `{分数}` | Lighthouse 各项得分 | `62` |
| `{粘贴Lighthouse部分}` | Opportunities 和 Diagnostics | 从 Lighthouse 报告复制 |

### 适用场景

- 网站性能分数偏低需要优化方案
- Core Web Vitals 不达标需要改进
- 项目上线前的性能审查
- 定期性能巡检和优化

### 使用建议

1. 直接从 Chrome Lighthouse 面板复制 Opportunities 和 Diagnostics 部分
2. 填入真实的各项分数，AI 会按影响排序
3. 优化方案会按"快速/中期/长期"分类，便于排期
4. 配合 `bundle-analysis.md` 模板一起使用效果更佳