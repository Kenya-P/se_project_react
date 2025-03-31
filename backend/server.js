// const express = require('express');
// const cors = require('cors');
// const path = require('path'); // Add this line at the top
// const fs = require('fs');

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// // Update the file reading code
// let items = [];
// try {
//   const dbPath = path.join(__dirname, 'db.json');
//   const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
//   items = dbData.items;
//   console.log('Items loaded:', items.length); // Add this line for debugging
// } catch (error) {
//   console.error('Error reading db.json:', error);
// }