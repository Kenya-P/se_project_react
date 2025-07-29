# WTWR Frontend (What To Wear 👕🌦️)

## 🧩 Project Overview

This frontend application is part of a weather-based clothing recommendation platform. It dynamically suggests clothing items based on the current weather, with features for user authentication, personalized clothing lists, and interactive UI components. The project is built using **Vite** and **React**, following modern coding and structural standards.

---

## 🚀 Features

- Weather API integration with dynamic clothing suggestions
- User authentication (registration, login, token-based authorization)
- Add, like, and delete clothing items
- Responsive and component-based UI with conditional rendering
- Protected routes and persistent user sessions
- Styled components with context-based theme switching
- Local storage management with JWT support

---

## 🛠️ Technologies Used

- **React** (Functional components and Hooks)
- **Vite** (for fast development builds)
- **CSS** (Component-level styling and global styles via `normalize.css`)
- **React Router**
- **Prettier** (code formatting)
- **OpenWeather API** (for weather data)
- **Custom API** (for user and item data)

---

## 🌦️ Weather API

- Forecasted temperature fetched via one GET request

- Logic to convert and store Fahrenheit/Celsius

- Coordinates and API key managed inside utils/weatherApi.js

## 🔐 Authentication

- JWT token saved to and checked in local storage

- Authorization checks implemented via context and protected routes

- Separate modals for Login and Register

## 🔁 Routing

- / — Main page (default)

- /profile — Protected user profile page

- Navigation and redirect handled on login/logout

## 📄 Code Standards

- camelCase for variables and functions

- Descriptive, noun-based variable names

- Function names begin with a verb

- Context providers for state management

- Prettier for formatting (.prettierignore included)

---

### 🔗 Github link

- frontend
https://github.com/Kenya-P/se_project_react.git

- backend
https://github.com/Kenya-P/se_project_express

### 🌐 Deployment

Backend URL: [https://api.wtwr-kenya.crabdance.com]

- The backend supports both HTTP and HTTPS connections.

Frontend URL: [https://wtwr-kenya.crabdance.com/]