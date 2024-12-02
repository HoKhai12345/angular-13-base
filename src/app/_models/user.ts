export interface User {
  id: number;
  username: string;
  email: string;
  // thêm các trường khác nếu cần
}

export interface UserPagination {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
} 