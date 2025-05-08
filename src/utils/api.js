const baseUrl = 'http://localhost:3000';
const api = { getItems, addItem, removeItem, checkToken, signIn, signUp, _handleResponse };

export function _handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
}

function getItems() {
    return fetch(`${baseUrl}/items`, {
        method: "GET",
    })
    .then(_handleResponse)
    .catch((error) => Promise.reject(error));
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  }).then(_handleResponse)
  .catch((error) => Promise.reject(error));
}

function removeItem(itemId) {
    return fetch(`${baseUrl}/items/${itemId}`, {
        method: "DELETE",
    })
    .then(_handleResponse)
    .catch((error) => Promise.reject(error));
}

function signUp({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(_handleResponse)
  .catch((error) => Promise.reject(error));
}

function signIn({ email, password }) {
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

export default api;
