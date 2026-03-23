/**
 * UserCard 组件测试
 *
 * 包含5个基础测试用例，覆盖核心功能
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCard from '../index';
import { useUserStore } from '../store/userStore';

// Mock Ant Design 图标
jest.mock('@ant-design/icons', () => ({
  UserOutlined: () => <span data-testid="user-icon">👤</span>,
  MailOutlined: () => <span data-testid="mail-icon">📧</span>,
  PhoneOutlined: () => <span data-testid="phone-icon">📱</span>,
  CalendarOutlined: () => <span data-testid="calendar-icon">📅</span>,
}));

// Mock classnames 库
jest.mock('classnames', () => (obj: Record<string, boolean>) => {
  const classes = Object.entries(obj)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ');
  return `mock-classname ${classes}`;
});

// Mock zustand store
jest.mock('../store/userStore', () => ({
  useUserStore: jest.fn(),
}));

const mockUseUserStore = useUserStore as jest.MockedFunction<typeof useUserStore>;

// Mock fetchUserDetails 函数
const mockFetchUserDetails = jest.fn();

describe('UserCard 组件测试', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUserStore.mockReturnValue({
      fetchUserDetails: mockFetchUserDetails,
    } as any);
  });

  /**
   * 测试用例 1: 渲染基本用户信息
   */
  test('应该正确渲染用户基本信息', () => {
    render(
      <UserCard
        userId="123"
        userName="张三"
        department="技术部"
        position="前端工程师"
      />
    );

    // 验证用户名显示
    expect(screen.getByText('张三')).toBeInTheDocument();

    // 验证部门信息显示
    expect(screen.getByText('技术部')).toBeInTheDocument();

    // 验证职位信息显示
    expect(screen.getByText('前端工程师')).toBeInTheDocument();
  });

  /**
   * 测试用例 2: 点击卡片触发回调函数
   */
  test('点击卡片应该触发 onCardClick 回调', () => {
    const handleClick = jest.fn();

    render(
      <UserCard
        userId="123"
        userName="张三"
        department="技术部"
        position="前端工程师"
        onCardClick={handleClick}
      />
    );

    // 找到并点击卡片
    const card = screen.getByRole('button', { name: /张三/i });
    fireEvent.click(card);

    // 验证回调被调用且参数正确
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith('123');
  });

  /**
   * 测试用例 3: 显示/隐藏详细信息
   */
  test('showDetail 参数应该控制详细信息显示', async () => {
    // 默认显示详细信息
    const { rerender } = render(
      <UserCard
        userId="123"
        userName="张三"
        department="技术部"
        position="前端工程师"
        showDetail={true}
      />
    );

    // 验证加载状态显示
    expect(screen.getByText('加载中...')).toBeInTheDocument();

    // Mock 数据返回
    mockFetchUserDetails.mockResolvedValueOnce({
      id: '123',
      name: '张三',
      department: '技术部',
      position: '前端工程师',
      email: 'zhangsan@company.com',
      joinDate: '2023-01-15',
      isActive: true,
    });

    // 等待数据加载完成
    await waitFor(() => {
      expect(screen.getByText('zhangsan@company.com')).toBeInTheDocument();
    });

    // 重新渲染，不显示详细信息
    rerender(
      <UserCard
        userId="123"
        userName="张三"
        department="技术部"
        position="前端工程师"
        showDetail={false}
      />
    );

    // 验证详细信息不再显示
    expect(screen.queryByText('zhangsan@company.com')).not.toBeInTheDocument();
    expect(screen.queryByText('加载中...')).not.toBeInTheDocument();
  });

  /**
   * 测试用例 4: 处理加载和错误状态
   */
  test('应该正确处理加载和错误状态', async () => {
    // 模拟 API 错误
    mockFetchUserDetails.mockRejectedValueOnce(new Error('用户不存在'));

    render(
      <UserCard
        userId="error"
        userName="错误用户"
        department="技术部"
        position="前端工程师"
        showDetail={true}
      />
    );

    // 验证初始加载状态
    expect(screen.getByText('加载中...')).toBeInTheDocument();

    // 等待错误显示
    await waitFor(() => {
      expect(screen.getByText('数据加载失败')).toBeInTheDocument();
      expect(screen.getByText('用户不存在')).toBeInTheDocument();
    });

    // 验证错误消息包含正确的类名
    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toBeInTheDocument();
  });

  /**
   * 测试用例 5: 用户状态标签显示
   */
  test('应该根据 isActive 显示不同的状态标签', () => {
    // 在职状态
    const { rerender } = render(
      <UserCard
        userId="123"
        userName="张三"
        department="技术部"
        position="前端工程师"
        isActive={true}
      />
    );

    // 验证在职标签
    expect(screen.getByText('在职')).toBeInTheDocument();
    expect(screen.getByText('在职')).toHaveStyle('color: success');

    // 重新渲染为离职状态
    rerender(
      <UserCard
        userId="123"
        userName="张三"
        department="技术部"
        position="前端工程师"
        isActive={false}
      />
    );

    // 验证离职标签
    expect(screen.getByText('离职')).toBeInTheDocument();
    expect(screen.getByText('离职')).toHaveStyle('color: default');
  });

  /**
   * 测试用例 6: 头像显示逻辑
   */
  test('应该根据 avatarUrl 显示不同头像', () => {
    // 有头像URL的情况
    const { rerender } = render(
      <UserCard
        userId="123"
        userName="张三"
        avatarUrl="https://example.com/avatar.jpg"
        department="技术部"
        position="前端工程师"
      />
    );

    // 验证头像图片存在
    const avatarImg = screen.getByAltText('张三');
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', 'https://example.com/avatar.jpg');

    // 无头像URL的情况
    rerender(
      <UserCard
        userId="123"
        userName="张三"
        department="技术部"
        position="前端工程师"
      />
    );

    // 验证默认头像显示用户首字母
    const defaultAvatar = screen.getByText('张');
    expect(defaultAvatar).toBeInTheDocument();
  });
});