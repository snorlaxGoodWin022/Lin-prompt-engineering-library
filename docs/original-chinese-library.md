## 一、什么是Prompt工程
<font style="color:#DF2A3F;">Prompt工程就是学会怎么跟AI说话，让它按你的要求干活</font>。在前端开发中，好的Prompt能让AI生成符合项目规范、可以直接用的代码，而不是那种看起来能跑、实际上到处是坑的代码。

**核心原则：**

+ 说清楚你要什么（明确需求）
+ 告诉AI你的项目用什么技术栈
+ 给出具体的代码规范要求
+ 提供输入输出示例

---

## 二、业务场景一：组件开发标准化
### 场景描述
你在开发一个中后台系统，需要封装大量业务组件。每次都要重复说明技术栈、命名规范、文件结构，很浪费时间。

### Prompt模板1：React业务组件生成
```markdown
你是一个资深前端工程师，请帮我生成一个React业务组件。

【技术栈】
- React 18 + TypeScript
- 状态管理：Zustand
- UI库：Ant Design 5.x
- 样式方案：CSS Modules

【代码规范】
1. 组件名使用PascalCase
2. 文件夹结构：
   ComponentName/
   ├── index.tsx          # 组件入口
   ├── types.ts           # TypeScript类型定义
   ├── styles.module.css  # 样式文件
   └── __tests__/         # 测试文件
3. Props必须有完整的TypeScript类型定义
4. 导出组件时使用export default
5. 所有函数必须写JSDoc注释

【组件需求】
组件名：{组件名称}
功能描述：{详细描述组件要做什么}
Props定义：
- {prop1}: {类型} - {说明}
- {prop2}: {类型} - {说明}

【额外要求】
- 需要处理loading状态
- 需要错误边界处理
- 需要写5个基础测试用例

请生成完整的代码，包括所有文件。
```

**使用示例：**

```markdown
你是一个资深前端工程师，请帮我生成一个React业务组件。

【技术栈】
- React 18 + TypeScript
- 状态管理：Zustand
- UI库：Ant Design 5.x
- 样式方案：CSS Modules

【代码规范】
1. 组件名使用PascalCase
2. 文件夹结构：
   ComponentName/
   ├── index.tsx
   ├── types.ts
   ├── styles.module.css
   └── __tests__/
3. Props必须有完整的TypeScript类型定义
4. 导出组件时使用export default
5. 所有函数必须写JSDoc注释

【组件需求】
组件名：UserCard
功能描述：展示用户信息卡片，包含头像、姓名、部门、职位，支持点击跳转用户详情页
Props定义：
- userId: string - 用户ID
- showDetail: boolean - 是否显示详细信息，默认true
- onCardClick?: (userId: string) => void - 卡片点击回调

【额外要求】
- 需要处理loading状态
- 需要错误边界处理
- 需要写5个基础测试用例

请生成完整的代码，包括所有文件。
```

---

### Prompt模板2：Vue 3组合式API组件生成
```markdown
你是一个Vue 3专家，请帮我创建一个组合式API组件。

【项目配置】
- Vue 3.4 + TypeScript
- 构建工具：Vite
- UI库：Element Plus
- 状态管理：Pinia
- 样式：SCSS

【命名与结构规范】
1. 组件文件名：kebab-case.vue
2. setup script使用<script setup lang="ts">
3. 样式使用<style scoped lang="scss">
4. 类型定义单独文件types.ts
5. 组合式函数放在composables文件夹

【组件要求】
组件名：{组件名}
功能：{功能描述}
Props：
- {prop名}: {类型} - {说明} - {默认值}
Events：
- {事件名}: {参数} - {触发时机}

【代码质量要求】
- 使用defineProps和defineEmits
- Props和Emits都要有完整类型定义
- 响应式变量用ref/reactive，说明使用理由
- 副作用统一放在onMounted
- 提供组件使用示例

生成完整代码，包括组件文件、类型文件、使用示例。
```

---

### Prompt模板3：组件文档自动生成
```markdown
请为以下React组件生成完整的使用文档。

【组件代码】
{粘贴你的组件代码}

【文档要求】
1. 组件简介（一句话说明用途）
2. 安装依赖说明
3. Props API表格
   - 参数名 | 类型 | 默认值 | 说明
4. Events事件表格（如果有）
5. 三个使用示例：
   - 基础用法
   - 进阶用法
   - 完整配置示例
6. 注意事项（如果有特殊限制）
7. FAQ（至少3个常见问题）

文档格式使用Markdown，要清晰易读。
```

---

## 三、业务场景二：性能优化自动化
### 场景描述
项目跑Lighthouse分数很低，需要针对性优化，但不知道从哪里下手。

### Prompt模板4：Lighthouse报告解读
```markdown
我跑了一个Lighthouse性能测试，帮我分析报告并给出优化方案。

【项目信息】
- 框架：React 18
- 打包工具：Webpack 5
- 部署：Nginx

【Lighthouse得分】
Performance: {分数}
Accessibility: {分数}
Best Practices: {分数}
SEO: {分数}

【主要问题】
{粘贴Lighthouse Opportunities和Diagnostics部分}

【要求】
1. 按优先级排序问题（影响最大的排前面）
2. 每个问题给出：
   - 问题原因（用白话解释）
   - 具体优化方案（给代码示例）
   - 预期提升效果
3. 区分哪些是快速优化（1天内），哪些需要重构（1周以上）
4. 给出优化后预期分数范围

不要给我理论，直接告诉我怎么改代码。
```

---

### Prompt模板5：Bundle分析与代码分割
```markdown
我的打包产物太大了，帮我分析并给出代码分割方案。

【当前情况】
- 打包工具：{Webpack/Vite/Rollup}
- 主包大小：{xxx MB}
- 主要依赖：{列出package.json里体积大的库}
- 路由数量：{大约多少个页面}

【项目特点】
- 是否需要SEO：{是/否}
- 首屏加载要求：{多少秒内}
- 用户网络环境：{4G/5G/光纤}

【Bundle分析报告】
{如果有webpack-bundle-analyzer截图或数据，粘贴在这}

【输出要求】
1. 识别可以懒加载的模块
2. 提供路由懒加载代码
3. 第三方库按需引入方案
4. 提取公共chunks配置
5. 预计优化后体积

给我可以直接复制粘贴的配置代码。
```

---

### Prompt模板6：图片资源优化方案
```markdown
项目里图片太多太大，加载慢，帮我优化。

【现状】
- 图片总数：约{数量}张
- 主要格式：{JPG/PNG/SVG}
- 存放位置：{CDN/项目内/混合}
- 单张最大：{xxx KB}

【使用场景】
- 轮播图：{多少张，尺寸}
- 商品图：{多少张，尺寸}
- icon图标：{多少个}
- 背景图：{多少张}

【技术栈】
- 构建工具：{Webpack/Vite}
- 框架：{React/Vue}
- 是否支持WebP：{是/否}

【要求】
1. 图片压缩方案（给工具和配置）
2. 格式转换策略（什么场景用什么格式）
3. 响应式图片方案（不同设备加载不同尺寸）
4. 懒加载实现代码
5. CDN配置建议

每个方案给具体代码示例，我照着改就能用。
```

---

## 四、业务场景三：团队协作规范
### Prompt模板7：Git Commit Message生成
```markdown
根据我的代码改动，生成符合规范的Git Commit Message。

【Commit规范】
格式：<type>(<scope>): <subject>

type类型：
- feat: 新功能
- fix: 修复bug
- docs: 文档修改
- style: 代码格式调整（不影响功能）
- refactor: 重构（不是新功能也不是修bug）
- perf: 性能优化
- test: 测试相关
- chore: 构建工具、依赖更新

【本次改动】
{简单描述你改了什么，或者贴git diff}

【要求】
1. subject不超过50字
2. 用中文
3. 说清楚改了什么、为什么改
4. 如果是fix，说明修复了什么问题

给我3个备选commit message，我选一个。
```

**使用示例：**

```markdown
根据我的代码改动，生成符合规范的Git Commit Message。

【Commit规范】
格式：<type>(<scope>): <subject>

【本次改动】
修改了UserList组件，之前翻页的时候会丢失筛选条件，现在把筛选参数存到URL query里，刷新和翻页都能保持状态了。

【要求】
1. subject不超过50字
2. 用中文
3. 说清楚改了什么、为什么改

给我3个备选commit message，我选一个。
```

---

### Prompt模板8：Pull Request描述生成
```markdown
帮我写一个Pull Request描述。

【改动内容】
{简要说明这个PR做了什么}

【关联Issue】
{如果有的话，贴issue链接或编号}

【测试情况】
- 单元测试：{通过/未通过/未写}
- 手动测试场景：{列出你测了哪些功能}

【PR模板要求】
## 改动说明
{这部分AI生成}

## 改动类型
- [ ] 新功能
- [ ] Bug修复
- [ ] 代码重构
- [ ] 性能优化
- [ ] 文档更新

## 测试checklist
- [ ] 单元测试通过
- [ ] 手动测试通过
- [ ] 代码review完成

## 注意事项
{如果有需要reviewer特别注意的地方}

## 截图/录屏
{如果是UI改动，提醒我补充截图}

描述要详细，但不要废话，让reviewer快速了解这个PR。
```

---

### Prompt模板9：技术文档快速撰写
```markdown
帮我写一份技术文档。

【文档类型】
{选择：功能设计文档/接口文档/组件库文档/项目架构文档}

【背景信息】
项目名：{项目名}
涉及模块：{哪些模块}
技术栈：{使用的技术}

【核心内容】
{粗略描述要写什么，可以是bullet points}

【文档要求】
1. 结构清晰，有目录
2. 用Markdown格式
3. 代码示例带注释
4. 有流程图的地方用Mermaid
5. 关键点用表格整理

【输出格式】
- 如果是设计文档：背景-方案对比-最终方案-实施计划
- 如果是接口文档：接口列表-请求参数-响应示例-错误码
- 如果是组件文档：组件介绍-API-示例-最佳实践

目标读者是{前端新人/后端同事/产品经理}，用他们能看懂的语言写。
```

---

## 五、Prompt优化技巧
### 技巧1：分步骤拆解复杂需求
**不好的Prompt：**

```markdown
帮我做一个用户管理页面 
```

**好的Prompt：**

```markdown
我要做一个用户管理页面，分三步：

第一步：先帮我设计数据结构和接口
- 用户列表接口
- 用户详情接口
- 创建/编辑/删除接口

第二步：根据接口设计页面组件结构
- 列表组件
- 搜索筛选组件
- 编辑弹窗组件

第三步：写具体代码
- 使用React + Ant Design
- 状态管理用Zustand
- 表单校验用react-hook-form

现在先做第一步，设计好了我再让你做第二步。
```

---

### 技巧2：提供正反示例
**示例Prompt：**

```markdown
帮我写一个表单验证函数。

【好的示例】
// 清晰的错误提示，指出具体问题
if (!email.includes('@')) {
  return { valid: false, message: '邮箱格式不正确，缺少@符号' };
}

【不好的示例】
// 模糊的错误提示
if (!validate(email)) {
  return { valid: false, message: '输入错误' };
}

按照好的示例风格，给我写手机号、身份证号的验证函数。
```

---

### 技巧3：明确输出格式
**示例Prompt：**

```markdown
帮我整理这个API接口文档。

【输入】
{粘贴杂乱的接口信息}

【输出格式要求】
用Markdown表格，必须包含：
| 字段名 | 类型 | 必填 | 说明 | 示例值 |

不要给我文字描述，直接给表格，我要复制粘贴到文档里。
```

---

## 六、Prompt模板库使用指南
### 如何管理你的Prompt库
**方式1：本地文件管理**

```markdown
prompts/
├── component/
│   ├── react-component.md
│   ├── vue-component.md
│   └── component-doc.md
├── performance/
│   ├── lighthouse.md
│   ├── bundle-analyze.md
│   └── image-optimize.md
└── team/
    ├── commit-message.md
    ├── pr-template.md
    └── tech-doc.md
```

**方式2：使用Notion/飞书文档**

+ 建立数据库，每个Prompt是一条记录
+ 标签分类：组件开发、性能优化、团队协作
+ 添加"使用次数"字段，统计常用Prompt

**方式3：浏览器书签**

+ 把常用Prompt做成HTML页面
+ 点击书签快速复制

---

### Prompt迭代优化流程
1. **记录问题**：AI生成的代码哪里不符合预期
2. **调整Prompt**：补充缺失的规范说明
3. **测试验证**：用新Prompt再生成一次
4. **版本管理**：Prompt也要git管理，记录改动原因

**示例：**

```markdown
v1.0 - 基础React组件Prompt，但AI经常忘记写PropTypes
v1.1 - 补充"必须写完整TypeScript类型"要求
v1.2 - 增加"导出类型定义"要求
v2.0 - 加入错误边界和loading处理要求
```

---

## 七、实战练习
### 练习1：创建你的第一个Prompt模板
**任务：** 为你们项目最常用的组件类型（比如表单、列表、弹窗）写一个Prompt模板。

**要求：**

1. 包含完整的技术栈说明
2. 列出3-5条代码规范
3. 提供一个真实使用示例
4. 测试生成的代码能否直接用

### 练习2：优化现有Prompt
拿一个你之前用过的Prompt，对比生成效果：

+ 哪些部分符合预期？
+ 哪些需要手动修改？
+ 如何调整Prompt减少修改？

### 练习3：建立团队Prompt库
和同事一起：

1. 整理大家常用的Prompt
2. 统一格式和规范
3. 建立共享文档
4. 定期review和更新

---

## 八、常见问题
**Q1：Prompt越详细越好吗？** 不一定。太详细会让AI迷失重点，核心是"说清楚关键要求"，非关键细节可以后续调整。

**Q2：为什么同样的Prompt，有时效果好有时不好？** AI有随机性。如果需要稳定输出，可以：

+ 把关键规范用代码示例说明
+ 使用"必须"、"禁止"等强制性词汇
+ 多生成几次取最好的

**Q3：Prompt模板需要经常更新吗？** 看项目变化：

+ 技术栈升级 → 必须更新
+ 新增代码规范 → 及时补充
+ 发现AI常犯错误 → 针对性优化

**Q4：如何让团队都用统一的Prompt？**

+ 放在团队文档，onboarding时培训
+ Code Review时检查代码是否符合Prompt规范
+ 定期分享优秀Prompt案例

---

## 九、本章总结
掌握Prompt工程的核心是：

1. **明确需求** - 告诉AI你要什么
2. **提供上下文** - 说清楚项目背景和技术栈
3. **约束规范** - 定义代码质量标准
4. **持续优化** - 根据效果迭代Prompt

建立自己的Prompt库，就像建立代码片段库一样，是提升效率的长期投资。

---

 

