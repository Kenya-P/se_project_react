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
import {register, logIn, checkToken} from '../../utils/auth';

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
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  }

  const handleAddClick = () => {
    setActiveModal("add-garment")
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

const handleLogInUser = (userData) => {
    setIsLoading(true);
    return logIn(userData)
    .then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      }
    })
    .then((userData) => {
      if (userData) {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        navigate("/profile");
        closeActiveModal();
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

const handleRegisterUser = (userData) => {
  // Start loading state
  setIsLoading(true);

  // Validate the user data before sending it
  if (!userData.name || !userData.email || !userData.password) {
    console.error("Please fill in all fields");
    setIsLoading(false);
    return;
  }

  // Send the data to the backend
  return register(userData)
    .then(() => {
      // After successful registration, log in the user
      return logIn({ 
        email: userData.email, 
        password: userData.password
      });
    })
    .then((res) => {
      if (res.token) {
        // Successful registration, store JWT and user info
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        setIsRegisterModalOpen(false);
      }
    })
    .catch((error) => {
      // Handle different types of errors (e.g., email already exists)
      if (error.response && error.response.status === 409) {
        console.error("User with this email already exists");
      } else {
        console.error("Error registering user:", error);
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
};


  const handleLogoutUser = () => {
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


/*useEffect(() => {
  const fetchItems = async () => {
    try {
      const data = await api.getItems();
      console.log("Fetched clothing items:", data);
      setClothingItems(data);  // Update the state with the fetched items
    } catch (error) {
      console.error("Error fetching clothing items:", error);
      // Optionally handle the error by showing a message to the user
    }
  };

  fetchItems();
}, []);  // This effect runs once when the component mounts */

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

/*useEffect(() => {
  const checkUserToken = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const user = await api.checkToken(token);
        setCurrentUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error checking token:", error);
        handleLogoutUser();  // Sign out the user if the token is invalid
      }
    }
  };

  checkUserToken();
}, []);*/

useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          if (userData) {
            setCurrentUser(userData);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("jwt");
            setIsLoggedIn(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);


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
