const API_URL = "http://localhost:8000"; // Используем правильный порт для FastAPI

// Функция регистрации
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData), // Передаем данные пользователя в формате JSON
  });

  if (!response.ok) {
    throw new Error('Registration failed'); // Выбрасываем ошибку, если регистрация не удалась
  }

  return response.json(); // Возвращаем ответ
}

// Функция логина
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Используем application/json
    },
    body: JSON.stringify(credentials), // Передаем данные для логина в формате JSON
  });

  if (!response.ok) {
    throw new Error('Invalid credentials'); // Выбрасываем ошибку, если логин не удался
  }

  return response.json(); // Возвращаем ответ (включая токен)
}

// Функция для логаута
export function logoutUser() {
  localStorage.removeItem("token"); // Удаляем токен из localStorage
}
