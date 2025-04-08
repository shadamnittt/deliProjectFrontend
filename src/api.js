import { API_URL } from "./config";

export async function loginUser(username, password) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  localStorage.setItem("access_token", data.access_token);
  return data;
}


export async function registerUser(username, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }), // Убираем email, так как он не используется на бэке
  });

  if (!response.ok) throw new Error("Registration failed");

  const data = await response.json();
  localStorage.setItem("access_token", data.access_token); // Сохраняем токен после регистрации
  return data;
}


