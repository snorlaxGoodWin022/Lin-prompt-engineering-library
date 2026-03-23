/**
 * UserCard 组件 Props 类型定义
 */

export interface UserCardProps {
  /** 用户ID，用于获取用户数据和点击事件 */
  userId: string;

  /** 用户姓名 */
  userName: string;

  /** 用户头像URL，可选，无头像时显示默认头像 */
  avatarUrl?: string;

  /** 所属部门 */
  department: string;

  /** 职位 */
  position: string;

  /** 是否显示详细信息，默认显示 */
  showDetail?: boolean;

  /** 用户是否在职状态，用于显示不同样式 */
  isActive?: boolean;

  /** 卡片点击回调函数 */
  onCardClick?: (userId: string) => void;
}

/**
 * 用户数据接口，模拟从API获取的数据结构
 */
export interface UserData {
  id: string;
  name: string;
  avatar?: string;
  department: string;
  position: string;
  email: string;
  phone?: string;
  joinDate: string;
  isActive: boolean;
}

/**
 * 组件状态类型
 */
export interface UserCardState {
  /** 是否正在加载数据 */
  isLoading: boolean;

  /** 错误信息，如果有的话 */
  error: Error | null;

  /** 用户详情数据 */
  userDetails: UserData | null;
}

/**
 * CSS 类名类型定义
 */
export interface UserCardClasses {
  card: string;
  cardInactive: string;
  avatar: string;
  avatarDefault: string;
  content: string;
  name: string;
  department: string;
  position: string;
  detailSection: string;
  detailItem: string;
  detailLabel: string;
  detailValue: string;
  loading: string;
  error: string;
}