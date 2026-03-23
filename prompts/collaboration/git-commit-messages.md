# Git Commit Message 生成模板

根据我的代码改动，生成符合规范的Git Commit Message。

## Commit 规范

**格式**：`<type>(<scope>): <subject>`

**type 类型**：
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档修改
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构（不是新功能也不是修bug）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建工具、依赖更新
- `ci`: CI/CD相关
- `revert`: 回滚提交

**scope（可选）**：影响范围，如组件名、模块名

## 本次改动

```
{简单描述你改了什么，或者贴git diff}
```

## 生成要求

1. **subject不超过50字** - 简明扼要说明改动
2. **用中文** - 符合团队语言习惯
3. **说清楚改了什么、为什么改** - 提供完整上下文
4. **如果是fix，说明修复了什么问题** - 问题现象和原因
5. **提供3个备选commit message** - 不同角度和详细程度

## 输出格式

请按以下格式提供3个选项：

```
选项1: <type>(<scope>): <subject>

选项2: <type>(<scope>): <subject>

选项3: <type>(<scope>): <subject>

详细说明：
- 选项1适合场景：...
- 选项2适合场景：...
- 选项3适合场景：...
```

---

## 使用示例

```
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