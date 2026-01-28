import { apiClient } from './base.service';

export const api = {
  get: <T>(url: string, params?: object) => {
    const query = params
      ? `?${new URLSearchParams(params as any).toString()}`
      : '';
    return apiClient<T>(`${url}${query}`, {
      method: 'GET',
    });
  },

  post: <T>(url: string, body?: object) =>
    apiClient<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body?: object) =>
    apiClient<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string) =>
    apiClient<T>(url, {
      method: 'DELETE',
    }),
};
