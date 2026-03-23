/**
 * UserCard 组件
 *
 * 展示用户信息卡片，包含头像、姓名、部门、职位信息。
 * 支持显示/隐藏详细信息模式，支持卡片点击事件。
 *
 * @component
 * @example
 * ```tsx
 * <UserCard
 *   userId="123"
 *   userName="张三"
 *   department="技术部"
 *   position="前端工程师"
 *   showDetail={true}
 *   onCardClick={(id) => console.log('点击用户:', id)}
 * />
 * ```
 */

import React, { useState, useEffect } from 'react';
import { Card, Avatar, Spin, Alert, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useUserStore } from './store/userStore'; // 假设有一个 Zustand store
import { UserCardProps, UserCardState, UserData } from './types';
import styles from './styles.module.css';

// 错误边界组件
class UserCardErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('UserCard 组件错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <Alert
            message="组件加载失败"
            description="用户卡片组件出现错误，请稍后重试或联系管理员。"
            type="error"
            showIcon
          />
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * UserCard 主组件
 * @param props - 组件属性
 * @returns UserCard 组件实例
 */
const UserCard: React.FC<UserCardProps> = ({
  userId,
  userName,
  avatarUrl,
  department,
  position,
  showDetail = true,
  isActive = true,
  onCardClick,
}) => {
  // 状态管理
  const [state, setState] = useState<UserCardState>({
    isLoading: false,
    error: null,
    userDetails: null,
  });

  // 从 Zustand store 获取数据
  const { fetchUserDetails } = useUserStore();

  /**
   * 加载用户详情数据
   */
  const loadUserDetails = async () => {
    if (!showDetail) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // 模拟 API 调用
      const userData = await fetchUserDetails(userId);

      setState(prev => ({
        ...prev,
        isLoading: false,
        userDetails: userData,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error('加载用户数据失败'),
      }));
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, [userId, showDetail]);

  /**
   * 处理卡片点击事件
   */
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(userId);
    }
  };

  /**
   * 获取用户姓名的首字母，用于默认头像
   */
  const getInitial = (name: string): string => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  /**
   * 渲染用户头像
   */
  const renderAvatar = () => {
    if (avatarUrl) {
      return (
        <img
          src={avatarUrl}
          alt={userName}
          className={styles.avatar}
          onError={(e) => {
            // 图片加载失败时显示默认头像
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }

    return (
      <div className={styles.avatarDefault}>
        <span>{getInitial(userName)}</span>
      </div>
    );
  };

  /**
   * 渲染详细信息部分
   */
  const renderDetailSection = () => {
    if (!showDetail) return null;

    if (state.isLoading) {
      return (
        <div className={styles.loading}>
          <Spin size="small" />
          <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>加载中...</div>
        </div>
      );
    }

    if (state.error) {
      return (
        <div className={styles.error}>
          <Alert
            message="数据加载失败"
            description={state.error.message}
            type="warning"
            showIcon
            closable
            onClose={() => setState(prev => ({ ...prev, error: null }))}
          />
        </div>
      );
    }

    if (state.userDetails) {
      const { email, phone, joinDate } = state.userDetails;

      return (
        <div className={styles.detailSection}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>
              <MailOutlined style={{ marginRight: 4 }} />
              邮箱
            </span>
            <span className={styles.detailValue}>{email}</span>
          </div>

          {phone && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>
                <PhoneOutlined style={{ marginRight: 4 }} />
                电话
              </span>
              <span className={styles.detailValue}>{phone}</span>
            </div>
          )}

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>
              <CalendarOutlined style={{ marginRight: 4 }} />
              入职日期
            </span>
            <span className={styles.detailValue}>
              {new Date(joinDate).toLocaleDateString('zh-CN')}
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  /**
   * 渲染状态标签
   */
  const renderStatusTag = () => {
    if (isActive) {
      return (
        <Tag color="success" style={{ marginLeft: 8, fontSize: 10 }}>
          在职
        </Tag>
      );
    }
    return (
      <Tag color="default" style={{ marginLeft: 8, fontSize: 10 }}>
        离职
      </Tag>
    );
  };

  // 组合 CSS 类名
  const cardClasses = classNames(styles.card, {
    [styles.cardInactive]: !isActive,
  });

  return (
    <UserCardErrorBoundary>
      <Card
        className={cardClasses}
        onClick={handleCardClick}
        hoverable
        size="small"
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {renderAvatar()}

          <div className={styles.content}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h3 className={styles.name}>{userName}</h3>
              {renderStatusTag()}
            </div>

            <div className={styles.department}>
              {department}
            </div>

            <div className={styles.position}>
              {position}
            </div>
          </div>
        </div>

        {renderDetailSection()}
      </Card>
    </UserCardErrorBoundary>
  );
};

// 组件默认导出
export default UserCard;