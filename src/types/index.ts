// src/types/index.ts
export type Role = "admin" | "sender" | "receiver";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Standard API wrapper for paginated lists (useful elsewhere)
export interface Paginated<T> {
  items: T[];
  total: number;
  page?: number;
  limit?: number;
}
