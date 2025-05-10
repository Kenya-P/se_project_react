import defaultClothingItems from '../../db.json';

const mockApi = {
  getItems: () => {
   // Try to get items from localStorage first
   const storedItems = localStorage.getItem('clothingItems');
   if (storedItems) {
     return Promise.resolve(JSON.parse(storedItems));
   }
   // If no items in localStorage, use default items and store them
   localStorage.setItem('clothingItems', JSON.stringify(defaultClothingItems.items));
   return Promise.resolve(defaultClothingItems.items);
  },

  addItem: (item) => {
    // Get current items from localStorage, or use default items if none exist
    const storedItems = localStorage.getItem('clothingItems');
    const items = storedItems 
      ? JSON.parse(storedItems)
      : defaultClothingItems.items;

    // Add the new item
    const newItem = {
      ...item,
      _id: Date.now().toString()
    };
    items.unshift(newItem);
    
    // Save back to localStorage
    localStorage.setItem('clothingItems', JSON.stringify(items));
    return Promise.resolve(newItem);
  },
  
  removeItem: (itemId) => {
   const items = JSON.parse(localStorage.getItem('clothingItems'));
   const updatedItems = items.filter(item => item._id !== itemId);
   localStorage.setItem('clothingItems', JSON.stringify(updatedItems));
   return Promise.resolve();
  }
};

export default mockApi;