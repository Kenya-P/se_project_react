import defaultClothingItems from '../../db.json';
const api = {
  getItems: () => {
    return Promise.resolve(defaultClothingItems.items);
  },

  addItem: ({ name, imageUrl, weather }) => {
    const newItem = {
      _id: Date.now().toString(),
      name,
      imageUrl,
      weather,
    };
    return Promise.resolve(newItem);
  },

  removeItem: (itemId) => {
    return Promise.resolve();
  }
};

export default api;