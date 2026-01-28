export async function apiClient<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(`${API_BASE_URL}${url}`);
  console.log("url", url);

  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });
  console.log(res);

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}
