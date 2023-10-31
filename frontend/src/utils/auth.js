import { BASE_URL } from "./utils";

// Тело запроса
//
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Логиним пользователя
//
export function login(data) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(data),
  }).then(handleServerMessage);
}

// Регистрируем пользователя
//
export function register(data) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(data),
  }).then(handleServerMessage);
}

// Получаем токен
//
export function getContent(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  }).then(handleServerMessage);
}

// Проверка ответа сервера
//
function handleServerMessage(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
