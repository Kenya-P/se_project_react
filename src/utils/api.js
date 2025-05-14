const baseUrl = import.meta.env.MODE === "development"
  ? "http://localhost:3001"
  : "https://kenya-p.github.io/se_project_react";

  
export function _handleResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res.text().then((text) => {
    console.error("Response error text:", text); // Helps see HTML errors
    return Promise.reject(`Error ${res.status}: ${text}`);
  });
}

function getItems() {
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.warn("JWT token missing; skipping item fetch.");
    return Promise.resolve([]); // Avoid fetch if token is missing
  }

  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then(_handleResponse)
  .catch((error) => {
    console.error("Fetch items failed:", error);
    return [];
  });
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

function removeItem(itemId, token) {
    return fetch(`${baseUrl}/items/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then(_handleResponse)
    .catch((error) => Promise.reject(error));
}

function likeItem(itemId, token) {
    return fetch(`${baseUrl}/items/${itemId}/likes`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then(_handleResponse)
    .catch((error) => Promise.reject(error));
}

function dislikeItem(itemId, token) {
    return fetch(`${baseUrl}/items/${itemId}/likes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
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

function updateUserProfile({ name, avatar, token }) {
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

const api = {
    getItems,
    addItem,
    removeItem,
    likeItem,
    dislikeItem,
    checkToken,
    logIn,        // Note: it's logIn, not loginUser
    register,     // Note: it's register, not registerUser
    updateUserProfile,
    _handleResponse
};

export default api;
