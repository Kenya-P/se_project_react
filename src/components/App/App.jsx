import { useState, useEffect } from 'react';

import './App.css'
import { coordinates, APIkey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
//import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnit';
import AddItemModal from '../AddItemModal/AddItemModal';
import { defaultClothingItems } from '../../utils/constants';


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

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {

    setClothingItems([{ name, link: imageUrl, weather }, ...clothingItems]);
    closeActiveModal();
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then(data => {
      const currentTime =  Date.now();
      const filteredData = filterWeatherData(data, currentTime);
      setWeatherData(filteredData);
    }).catch(console.error);
  }, []);

  return (
    <CurrentTempUnitContext.Provider value={{ currentTempUnit, handleToggleSwitchChange }}>
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={ weatherData } handleItemClick={handleItemClick} clothingItems={clothingItems} />

        <Footer />
      </div>
      <AddItemModal isOpen={activeModal === "add-garment"} onClose={closeActiveModal} onAddItemModalSubmit={handleAddItemModalSubmit}/>
      <ItemModal activeModal={activeModal} handleCloseClick={closeActiveModal} item={selectedItem} />
    </div>
    </CurrentTempUnitContext.Provider>
  )
}

export default App
