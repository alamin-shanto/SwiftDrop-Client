// src/api/authApi.ts
import type { User } from "../types";
import { baseApi } from "./baseApi";

// Response shapes
export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: build.mutation<AuthResponse, RegisterPayload>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    me: build.query<{ user: User }, void>({
      query: () => ({ url: "/auth/me" }),
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
