const baseUrl = 'http://localhost:3001';
const api = { getItems, addItem, removeItem, likeItem, dislikeItem, checkToken, logIn, register, updateUserProfile, _handleResponse };
const token = localStorage.getItem('jwt');


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

function likeItem(itemId) {
    return fetch(`${baseUrl}/items/${itemId}/likes`, {
        method: "PUT",
    })
    .then(_handleResponse)
    .catch((error) => Promise.reject(error));
}

function dislikeItem(itemId) {
    return fetch(`${baseUrl}/items/${itemId}/likes`, {
        method: "DELETE",
    })
    .then(_handleResponse)
    .catch((error) => Promise.reject(error));
}

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

/*function logOut() {
  return fetch(`${baseUrl}/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(_handleResponse)
  .catch((error) => Promise.reject(error));
}*/

function updateUserProfile({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      avatar: avatar,
    }),
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
