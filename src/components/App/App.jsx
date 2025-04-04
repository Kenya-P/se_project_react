import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { coordinates, APIkey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import DeleteItemModal from '../DeleteItemModal/DeleteItemModal';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnit';
import api from '../../utils/mockApi';
function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: 999}, city: "", condition: "", isDay: false });
  const [activeModal, setActiveModal] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);


  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  }

  const handleAddClick = () => {
    setActiveModal("add-garment")
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

  return (
    <CurrentTempUnitContext.Provider value={{ currentTempUnit, handleToggleSwitchChange }}>
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route path="/" element={<Main weatherData={weatherData} handleItemClick={handleItemClick} clothingItems={clothingItems} />} />
            <Route path="/profile" element={<Profile onClick={handleItemClick} handleAddClick={handleAddClick} clothingItems={clothingItems} />} />
          </Routes>

        <Footer />
      </div>
      <AddItemModal isOpen={activeModal === "add-garment"} onClose={closeActiveModal} onAddItemModalSubmit={handleAddItemModalSubmit} isLoading={isLoading} />
      <ItemModal activeModal={activeModal} isOpen={activeModal === "preview"} onClose={closeActiveModal} item={selectedItem} handleDeleteClick={handleDeleteClick} />
      <DeleteItemModal activeModal={activeModal} isOpen={activeModal === "delete"}  onClose={closeActiveModal} onClick={handleDeleteItemModalSubmit} />    </div>
    </CurrentTempUnitContext.Provider>
  )
}

export default App
