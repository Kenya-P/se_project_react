import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { coordinates, APIkey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
//import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import DeleteItemModal from '../DeleteItemModal/DeleteItemModal';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnit';
import { defaultClothingItems } from '../../utils/constants';
import { addItem, getItems, removeItem } from '../../utils/api';


function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: 999}, city: "", condition: "", isDay: false });
  const [activeModal, setActiveModal] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

// add loading state
// const [loading, setLoading] = useState(false);

//make an empty array for clothing items
 const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  }

  const handleAddClick = () => {
    setActiveModal("add-garment")
  }

  const closeActiveModal = () => {
    setActiveModal("");
  }

  const handleItemClick = (item) => {
    setActiveModal("preview");
    setSelectedItem(item);
  }

  const handleDeleteClick = (item) => {
    setActiveModal("delete");
    setSelectedItem(item);
  }

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
    .then((newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
    });
    closeActiveModal();
  }

  const handleDeleteItemModalSubmit = (item) => {
    const itemId = item._id;
    removeItem(itemId)
    .then(() => {
      setClothingItems((clothingItems) => clothingItems.filter(() => item.id !== itemId));
      closeActiveModal();
    })
    .catch(console.error);
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then(data => {
      const currentTime =  Date.now();
      const filteredData = filterWeatherData(data, currentTime);
      setWeatherData(filteredData);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
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
            <Route path="/" element={<Main weatherData={weatherData} handleItemClick={handleItemClick} clothingItems={clothingItems} onDeleteClick={handleDeleteClick} />} />
            <Route path="/profile" element={<Profile onClick={handleItemClick} handleAddClick={handleAddClick} clothingItems={clothingItems} onDeleteClick={handleDeleteClick} />} />
          </Routes>

        <Footer />
      </div>
      <AddItemModal isOpen={activeModal === "add-garment"} onClose={closeActiveModal} onAddItemModalSubmit={handleAddItemModalSubmit}/>
      <ItemModal activeModal={activeModal} handleCloseClick={closeActiveModal} item={selectedItem} onDeleteClick={handleDeleteClick} />
      <DeleteItemModal isOpen={activeModal === "delete"} onClose={closeActiveModal} item={selectedItem} onDeleteClick={handleDeleteItemModalSubmit} />
    </div>
    </CurrentTempUnitContext.Provider>
  )
}

export default App
