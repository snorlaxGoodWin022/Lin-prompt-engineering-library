/**
 * UserStore - Zustand 状态管理
 *
 * 管理用户相关状态和数据获取
 */

import { create } from 'zustand';
import { UserData } from '../types';

// 模拟用户数据
const mockUsers: Record<string, UserData> = {
  '123': {
    id: '123',
    name: '张三',
    avatar: 'https://example.com/avatar1.jpg',
    department: '技术部',
    position: '前端工程师',
    email: 'zhangsan@company.com',
    phone: '13800138000',
    joinDate: '2023-01-15',
    isActive: true,
  },
  '456': {
    id: '456',
    name: '李四',
    department: '产品部',
    position: '产品经理',
    email: 'lisi@company.com',
    phone: '13900139000',
    joinDate: '2022-08-20',
    isActive: true,
  },
  '789': {
    id: '789',
    name: '王五',
    department: '设计部',
    position: 'UI设计师',
    email: 'wangwu@company.com',
    joinDate: '2023-03-10',
    isActive: false,
  },
};

interface UserStoreState {
  /** 当前加载中的用户ID */
  loadingUserId: string | null;

  /** 用户数据缓存 */
  usersCache: Record<string, UserData>;

  /** 错误信息 */
  error: string | null;

  /** 获取用户详情 */
  fetchUserDetails: (userId: string) => Promise<UserData>;

  /** 清除缓存 */
  clearCache: () => void;

  /** 更新用户数据 */
  updateUser: (userId: string, data: Partial<UserData>) => void;
}

/**
 * 创建用户状态管理 store
 */
export const useUserStore = create<UserStoreState>((set, get) => ({
  loadingUserId: null,
  usersCache: { ...mockUsers },
  error: null,

  fetchUserDetails: async (userId: string) => {
    // 设置加载状态
    set({ loadingUserId: userId, error: null });

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    const { usersCache } = get();

    // 检查缓存中是否有数据
    if (usersCache[userId]) {
      set({ loadingUserId: null });
      return usersCache[userId];
    }

    // 模拟 API 调用失败
    if (userId === 'error') {
      const error = new Error(`用户 ${userId} 不存在`);
      set({ loadingUserId: null, error: error.message });
      throw error;
    }

    // 模拟创建新用户数据
    const newUser: UserData = {
      id: userId,
      name: `用户${userId}`,
      department: '未知部门',
      position: '未知职位',
      email: `user${userId}@company.com`,
      joinDate: new Date().toISOString().split('T')[0],
      isActive: true,
    };

    // 更新缓存
    set(state => ({
      loadingUserId: null,
      usersCache: { ...state.usersCache, [userId]: newUser },
    }));

    return newUser;
  },

  clearCache: () => {
    set({ usersCache: {} });
  },

  updateUser: (userId: string, data: Partial<UserData>) => {
    set(state => {
      const currentUser = state.usersCache[userId];
      if (!currentUser) {
        return state;
      }

      const updatedUser = { ...currentUser, ...data };

      return {
        usersCache: {
          ...state.usersCache,
          [userId]: updatedUser,
        },
      };
    });
  },
}));