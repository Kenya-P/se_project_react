import { useState, useEffect } from 'react';
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
import * as auth from '../../utils/auth';

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: 999}, city: "", condition: "", isDay: false });
  const [activeModal, setActiveModal] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

//Modal
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
const [isItemModalOpen, setIsItemModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);


const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  }

  const handleAddClick = () => {
    //setActiveModal("add-garment")
    setIsAddItemModalOpen(true);
  }

  const handleLoginClick = () => {
    console.log("Login clicked");
    setActiveModal("login");
  }

  const handleRegisterClick = () => {
    console.log("Register clicked");
    setActiveModal("register");
  }

  const closeActiveModal = () => {
    setActiveModal("");
    setIsAddModalOpen(false);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsEditProfileModalOpen(false);
    setIsItemModalOpen(false);
    setIsDeleteModalOpen(false);
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

const navigate = useNavigate();

const handleLogInUser = ({ email, password }) => {
    setIsLoading(true);
  auth.logIn({ email, password })
  .then((res) => {
    if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return auth.checkToken(res.token);
      }
    })
    .then((userData) => {
      setCurrentUser(userData);
      navigate("/");
    })
    .catch((err) => {
      console.error("Login failed:", err);
      // optionally set error message for display
    })
    .finally(() => {
      setIsLoading(false);
      closeActiveModal();
    });
}

const handleUpdateUser = ({ name, avatar }) => {
  const token = localStorage.setItem("jwt", localStorage.getItem("jwt"));
  setIsLoading(true);
    api.updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser({
          ...currentUser,
          name: updatedUser.name,
          avatar: updatedUser.avatar,
        });
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
}

  const handleRegisterUser = ({ name, avatar, email, password }) => {
    setIsLoading(true);

    auth.register({ name, avatar, email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          return auth.checkToken(res.token);
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        // optionally: set error message state
      })
      .finally(() => {
        setIsLoading(false);
        closeActiveModal();
      });
}


  const handleLogoutUser = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  }

// Use Effects

  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then(data => {
      const filteredData = filterWeatherData(data);
      setWeatherData(filteredData);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (!token) return;

  auth.checkToken(token)
    .then((userData) => {
      setIsLoggedIn(true);
      setCurrentUser(userData);
    })
    .catch((err) => {
      console.error("Token check failed:", err);
      setIsLoggedIn(false);
      localStorage.removeItem("jwt");
    });
}, []);



  return (
    <CurrentTempUnitContext.Provider value={{ currentTempUnit, handleToggleSwitchChange }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              onAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              onLogoutClick={handleLogoutUser}
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
                      onLogoutClick={handleLogoutUser}
                      currentUser={currentUser}
                      onEditProfileClick={handleEditProfileClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
  
            <Footer />
          </div>
  
          <AddItemModal
            isOpen={isAddItemModalOpen}
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
