import { useState, useEffect } from 'react';

import './App.css'
import { coordinates, APIkey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: 999}, city: "" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then(data => {
      const currentTime =  Date.now();
      const filteredData = filterWeatherData(data, currentTime);
      setWeatherData(filteredData);
    }).catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={ weatherData } handleItemClick={handleItemClick} />

        <Footer />
      </div>
      <ModalWithForm buttonText='Add garment' title='New garment' isOpen={activeModal === "add-garment"} handleCloseClick={closeActiveModal}>
                <label htmlFor="name" className="modal__label" >Name
                  <input  id="name" type="text" className="modal__input" placeholder="Name" />
                  <span id="input-error" className="modal__input-error"></span>
                </label>

                <label htmlFor="image" className="modal__label" >Image
                  <input id="image" type="url" className="modal__input" placeholder="Image URL" />
                </label>

                <fieldset className="modal__radio-buttons">
                    <legend className="modal__label">Select the weather type:</legend>
                    <label htmlFor="hot" className="modal__label modal__label_type_radio" name="weather"> Hot
                        <input id="hot" type="radio" className="modal__radio-input" name="weather"></input>
                    </label>
                    <label htmlFor="warm" className="modal__label modal__label_type_radio" name="weather"> Warm
                        <input id="warm" type="radio" className="modal__radio-input" name="weather"></input>
                    </label>
                    <label htmlFor="cold" className="modal__label modal__label_type_radio" name="weather"> Cold
                        <input id="cold" type="radio" className="modal__radio-input" name="weather"></input>
                    </label>
                </fieldset>
      </ModalWithForm>
      <ItemModal activeModal={activeModal} handleCloseClick={closeActiveModal} item={selectedItem} />
    </div>
  )
}

export default App
