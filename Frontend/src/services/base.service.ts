import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { store } from "../store";
import { logout } from "../store/slices/authSlice";
import { showDialog } from "../store/slices/uiSlice";


export async function apiClient<T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  try {
    const response = await axios<T>({
      ...options,
      url: `${API_BASE_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...(options.headers || {}),
      },
    });

    console.log("baseService", response.data);
    return response.data;
  } catch (error: any) {
    // Axios puts response errors here
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch(showDialog({
          title: "Session Expired",
          message: "Your session has expired. Please login again to continue.",
          onConfirm: () => {
            store.dispatch(logout());
            window.location.href = "/login";
          }
        }));
      }
      throw error.response.data;
    }

    // Network / unexpected error
    throw error;
  }
}
