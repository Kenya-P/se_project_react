export const baseUrl = "http://localhost:3001";
  
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
    console.log("Sending token:", token);

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


function addItem(name, imageUrl, weather) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(_handleResponse)
    .catch((error) => Promise.reject(error));
}

function removeItem(itemId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  }).then(_handleResponse)
    .catch((error) => Promise.reject(error));
}

function likeItem(itemId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  }).then(_handleResponse)
    .catch((error) => Promise.reject(error));
}

function dislikeItem(itemId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  }).then(_handleResponse)
    .catch((error) => Promise.reject(error));
}

function updateUserProfile(name, avatar) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(_handleResponse)
    .catch((error) => Promise.reject(error));
}


const api = {
    getItems,
    addItem,
    removeItem,
    likeItem,
    dislikeItem,
    updateUserProfile,
    _handleResponse
};

export default api;
