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
import handleSubmit from '../../utils/handleSubmit';

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
  setActiveModal("add-garment")
  setIsAddItemModalOpen(true);
}

const handleLoginClick = () => {
  setActiveModal("login");
}

const handleRegisterClick = () => {
  setActiveModal("register");
}

const handleSwitchToRegister = () => {
  closeActiveModal();
  setActiveModal("register");
}

const handleSwitchToLogin = () => {
  closeActiveModal();
  setActiveModal("login");
}

const closeActiveModal = () => {
  setActiveModal("");
  setIsAddItemModalOpen(false);
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
  setIsItemModalOpen(true);
}

const handleDeleteClick = (itemId) => {
  setSelectedItem({ _id: itemId });
  setActiveModal("delete");
}
  
const handleAddItem = (item) => {
  const makeRequest = () => api.addItem(item);

  handleSubmit(makeRequest, {
    onLoading: setIsLoading,
    onSuccess: (newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      closeActiveModal();
    },
  });
};


const handleLikeItem = ({ _id, isLiked }) => {
  const likeAction = isLiked ? api.dislikeItem : api.likeItem;

  const makeRequest = () => likeAction(_id);

  handleSubmit(makeRequest, {
    onSuccess: (updatedItem) => {
      setClothingItems((items) =>
        items.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );
    }
  });
};
  
const handleEditProfileClick = () => {
  setActiveModal("edit-profile");
  setIsEditProfileModalOpen(true);
}

const handleDeleteItem = (itemId) => {
  const makeRequest = () => api.removeItem(itemId);

  handleSubmit(makeRequest, {
    onLoading: setIsLoading,
    onSuccess: () => {
      setClothingItems((items) => items.filter((item) => item._id !== itemId));
      closeActiveModal();
    }
  });
};


const navigate = useNavigate();

const handleLogInUser = ({ email, password }) => {
  const makeRequest = () => auth.logIn({ email, password });

  handleSubmit(makeRequest, {
    onLoading: setIsLoading,
    onSuccess: (data) => {
      localStorage.setItem('jwt', data.token);
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      navigate('/');
      closeActiveModal();
    },
    onError: (err) => {
      console.error("Login failed:", err);
      setErrorMessage("Login failed. Please check your credentials.");
    }
  });
};


function handleUpdateUser(inputValues) {
  const makeRequest = () => api.updateUserProfile(inputValues);

  handleSubmit(makeRequest, {
    onLoading: setIsLoading,
    onSuccess: (updatedUser) => {
      setCurrentUser(updatedUser);
      closeActiveModal();
    }
  });
}


const handleRegisterUser = ({ name, avatar, email, password }) => {
  const makeRequest = () => auth.register({ name, avatar, email, password });

  handleSubmit(makeRequest, {
    onLoading: setIsLoading,
    onSuccess: (res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        auth.checkToken(res.token)
          .then((userData) => {
            setCurrentUser(userData);
            navigate("/profile");
            closeActiveModal();
          });
      }
    },
    onError: (err) => {
      console.error("Registration failed:", err);
    }
  });
};

const handleLogoutUser = () => {
  localStorage.removeItem("jwt");
  setIsLoggedIn(false);
  setCurrentUser({});
  navigate("/");
}

// Use Effects

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      getWeather(coordinates, APIkey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch((err) => {
          console.error("Weather fetch failed:", err);
        });
    },
    (err) => {
      console.error("Geolocation failed:", err);
    }
  );
}, []);


useEffect(() => {
      api.getItems()
      .then((items) => setClothingItems(items))
      .catch(console.error);
  }, []);


useEffect(() => {
  const token = localStorage.getItem("jwt");

  if (token) {
    auth.checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        return api.getItems();
      })
      .then((items) => {
        setClothingItems(items.reverse());
      })
      .catch((err) => {
        console.error("Login failed:", err);
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
                    onItemLike={handleLikeItem}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onClick={handleItemClick}
                      onLogoutClick={handleLogoutUser}
                      handleEditProfileClick={handleEditProfileClick}
                      handleAddClick={handleAddClick}
                      onItemLike={handleLikeItem}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
  
            <Footer />
          </div>
  
          <AddItemModal
            isOpen={activeModal === "add-garment" || isAddItemModalOpen}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItem}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            isOpen={activeModal === "preview" || isItemModalOpen}
            onClose={closeActiveModal}
            item={selectedItem}
            handleDeleteClick={handleDeleteClick}
          />
          <DeleteItemModal
            activeModal={activeModal}
            isOpen={activeModal === "delete" || isDeleteModalOpen}
            onClose={closeActiveModal}
            onClick={handleDeleteItem}
            itemId={selectedItem._id}
          />
          <RegisterModal
            isOpen={activeModal === "register" || isRegisterModalOpen}
            onClose={closeActiveModal}
            onRegister={handleRegisterUser}
            isLoading={isLoading}
            onClickLogin={handleSwitchToLogin}
          />
          <LoginModal
            isOpen={activeModal === "login" || isLoginModalOpen}
            onClose={closeActiveModal}
            onLogin={handleLogInUser}
            isLoading={isLoading}
            onClickRegister={handleSwitchToRegister}
          />
            <EditProfileModal
              isOpen={activeModal === "edit-profile" || isEditProfileModalOpen}
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
            />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTempUnitContext.Provider>
  );
  
}

export default App
