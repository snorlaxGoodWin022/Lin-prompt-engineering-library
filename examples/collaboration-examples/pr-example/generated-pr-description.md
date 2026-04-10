# PR: 支持手机号登录方式

## 改动说明

本次 PR 为登录页面新增手机号验证码登录方式，同时重构了原有的表单验证逻辑。

### 改动内容
1. 新增手机号 + 验证码登录表单
2. 重构表单验证逻辑，支持多登录方式切换
3. 添加验证码发送倒计时功能
4. 统一错误提示组件

### 改动类型
- [x] 新功能 (feature)
- [x] 代码重构 (refactor)
- [ ] Bug修复 (bug fix)
- [ ] 性能优化 (performance)

### 改动文件
- `src/pages/Login/index.tsx` — 登录页面主组件
- `src/components/PhoneForm/index.tsx` — 手机号登录表单
- `src/hooks/useVerifyCode.ts` — 验证码发送 Hook
- `src/utils/validators.ts` — 表单验证工具函数

## 测试 Checklist
- [x] 单元测试通过
- [x] 集成测试通过
- [x] 手动测试通过（账号密码/手机号登录）
- [x] 代码 Review 完成
- [x] 浏览器兼容性（Chrome/Safari/Firefox）

## 注意事项
⚠️ **验证码接口有变更**：`/api/sms/send` 新增 `type` 参数（login/register），请重点关注。

## 截图
（请在合并前补充手机号登录表单截图）
