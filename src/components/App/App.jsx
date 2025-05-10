import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css'
import { coordinates, APIkey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import DeleteItemModal from '../DeleteItemModal/DeleteItemModal';
import Profile from '../Profile/Profile';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import Footer from '../Footer/Footer';

import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnit';
import ProtectedRoute from '../../contexts/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import api from '../../utils/api';
import mockApi from '../../utils/mockApi';

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: 999}, city: "", condition: "", isDay: false });
  const [activeModal, setActiveModal] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  }

  const handleAddClick = () => {
    setActiveModal("add-garment")
  }

  const handleLoginClick = () => {
    setActiveModal("login");
  }

  const handleRegisterClick = () => {
    setActiveModal("register");
  }

  const closeActiveModal = () => {
    setActiveModal("");
  }

  useEffect(() => {

    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleItemClick = (item) => {
    setActiveModal("preview");
    setSelectedItem(item);
  }

  const handleDeleteClick = (itemId) => {
    setSelectedItem({ _id: itemId });
    setActiveModal("delete");
    }

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setIsLoading(true);
    return api.addItem({ name, imageUrl, weather })
    .then((newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      closeActiveModal();
    }).catch(console.error).finally(() => {
      setIsLoading(false);
    });
  }

  const handleLikeItem = (item) => {
    const token = localStorage.getItem("jwt");
    const isLiked = item.likes.includes(currentUser._id);
  
    const likeAction = isLiked
      ? api.dislikeItem(item._id, token)
      : api.likeItem(item._id, token);
  
    likeAction
      .then((updatedItem) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          )
        );
      })
      .catch((err) => {
        console.error("Error updating like status:", err);
      });
  };
  

  const handleEditProfileClick = () => {
    setEditProfileModalOpen(true);
  }

  const handleDeleteItemModalSubmit = () => {
    api.removeItem(selectedItem._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedItem._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  }

  const handleLogInUser = (userData) => {
      const navigate = useNavigate();
    setIsLoading(true);
    return api.loginUser(userData)
    .then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/profile");
      }
    })
      .catch((error) => {
        console.error("Error logging in user:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleUpdateUser = ({ name, avatar }) => {
    api.updateUserProfile({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  }

  const handleRegisterUser = (userData) => {
    setIsLoading(true);
    return api.registerUser(userData)
    .then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setCurrentUser({ name, email });
        setIsRegisterModalOpen(false);
      }
    })
      .catch((error) => {
        console.error("Error registering user:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleSignOutUser = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then(data => {
      const filteredData = filterWeatherData(data);
      setWeatherData(filteredData);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    api.getItems()
    .then(data => {
      setClothingItems(data);
    })
    .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api.checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        handleLogout();
      });
    }
  }
  , []);


  return (
    <CurrentTempUnitContext.Provider value={{ currentTempUnit, handleToggleSwitchChange }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              onSignOutClick={handleSignOutUser}
              handleEditProfileClick={handleEditProfileClick}
            />
  
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleItemClick={handleItemClick}
                    clothingItems={clothingItems}
                    onCardLike={handleLikeItem}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleItemClick={handleItemClick}
                      onSignOutClick={handleSignOutUser}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
  
            <Footer />
          </div>
  
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            isOpen={activeModal === "preview"}
            onClose={closeActiveModal}
            item={selectedItem}
            handleDeleteClick={handleDeleteClick}
          />
          <DeleteItemModal
            activeModal={activeModal}
            isOpen={activeModal === "delete"}
            onClose={closeActiveModal}
            onClick={handleDeleteItemModalSubmit}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegisterUser}
            isLoading={isLoading}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogInUser}
            isLoading={isLoading}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setEditProfileModalOpen(false)}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTempUnitContext.Provider>
  );
  
}

export default App
