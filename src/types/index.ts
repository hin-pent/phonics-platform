// 用户相关类型
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile {
  id: string;
  userId: string;
  realName: string;
  age: number;
  grade: string;
  enrollmentDate: Date;
  parentId?: string;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  realName: string;
  employeeId: string;
  subjects: string[];
  hireDate: Date;
}

export interface ParentProfile {
  id: string;
  userId: string;
  realName: string;
  phone: string;
  relationship: string;
}

// 课程相关类型
export interface Course {
  id: string;
  institutionId: string;
  name: string;
  description: string;
  difficultyLevel: string;
  createdBy: string;
  createdAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  orderIndex: number;
  multimediaResources: string[];
}

// 作业相关类型
export interface Homework {
  id: string;
  classId: string;
  title: string;
  description: string;
  type: 'QUIZ' | 'AUDIO_RECORDING' | 'DRAG_DROP' | 'TEXT_SUBMISSION' | 'MULTIPLE_CHOICE';
  dueDate: Date;
  teacherId: string;
  lessonId?: string;
  createdAt: Date;
}

export interface Submission {
  id: string;
  homeworkId: string;
  studentId: string;
  content: string;
  filePath?: string;
  submittedAt: Date;
  score?: number;
  feedback?: string;
  gradedAt?: Date;
  gradedBy?: string;
}

// 班级相关类型
export interface Class {
  id: string;
  institutionId: string;
  name: string;
  grade: string;
  teacherId: string;
  maxStudents: number;
  createdAt: Date;
}

// 学习记录类型
export interface PracticeRecord {
  id: string;
  studentId: string;
  lessonId: string;
  practiceType: string;
  score: number;
  duration: number;
  completedAt: Date;
}

export interface LearningProgress {
  id: string;
  studentId: string;
  courseId: string;
  completionRate: number;
  lastAccessedAt: Date;
}

// 通知相关类型
export interface Notification {
  id: string;
  userId: string;
  type: 'HOMEWORK_ASSIGNED' | 'HOMEWORK_GRADED' | 'SYSTEM_ANNOUNCEMENT' | 'PROGRESS_UPDATE' | 'REMINDER';
  title: string;
  content: string;
  relatedType?: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface NotificationPreferences {
  id: string;
  userId: string;
  allowHomeworkNotifications: boolean;
  allowGradeNotifications: boolean;
  allowSystemNotifications: boolean;
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: string[];
  };
  timestamp: string;
}

// 认证相关类型
export interface LoginRequest {
  username: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

// 练习题类型
export interface PracticeQuestion {
  id: string;
  type: 'multiple_choice' | 'drag_drop' | 'audio_recording' | 'text_input';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  audioUrl?: string;
  imageUrl?: string;
}

export interface PracticeSession {
  id: string;
  lessonId: string;
  questions: PracticeQuestion[];
  startTime: Date;
  endTime?: Date;
  score?: number;
}

// 统计分析类型
export interface StudentStats {
  totalPracticeTime: number;
  averageScore: number;
  completionRate: number;
  streakDays: number;
  lastActiveDate: Date;
}

export interface ClassStats {
  totalStudents: number;
  averageScore: number;
  homeworkCompletionRate: number;
  activeStudents: number;
  topPerformers: string[];
}

// UI组件类型
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export interface UIComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: UIComponent[];
}