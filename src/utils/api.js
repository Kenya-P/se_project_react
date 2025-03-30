const baseUrl = 'http://localhost:3000/api/v1'; // Replace with your actual API URL
const headers = { "Content-Type": "application/json" };


function _handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(_handleResponse);
}

function addItem(item) {
  return fetch( `${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(item)
  }).then(_handleResponse);
}

function  removeItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then(_handleResponse);
}

export { getItems, addItem, removeItem };