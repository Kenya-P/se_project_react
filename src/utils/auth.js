import { _handleResponse } from './api';

const auth = { register, logIn, checkToken };

const baseUrl = 'http://localhost:3001';
// const baseUrl = 'https://api.example.com';

function register({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(_handleResponse)
  .catch((error) => Promise.reject(error));
}

function logIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(_handleResponse)
  .catch((error) => Promise.reject(error));
}

function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(_handleResponse)
  .catch((error) => Promise.reject(error));
}

export default auth;