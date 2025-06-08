export const baseUrl = "http://localhost:3001";

export function _handleResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res.text().then((text) => {
    console.error("Response error text:", text);
    return Promise.reject(`Error ${res.status}: ${text}`);
  });
}

function request(url, options) {
  return fetch(url, options)
    .then(_handleResponse)
    .catch((error) => {
      console.error("API error:", error);
      throw error;
    });
}

function getItems() {
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.warn("JWT token missing; skipping item fetch.");
    return Promise.resolve([]);
  }

  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function addItem({ name, imageUrl, weather }) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function removeItem(itemId) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  });
}

function likeItem(itemId) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  });
}

function dislikeItem(itemId) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  });
}

function updateUserProfile({ name, avatar }) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
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
