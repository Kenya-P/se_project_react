import { useState } from 'react';

import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

import Footer from '../Footer/Footer';

function App() {
  const [weatherData, setWeatherData] = useState({ type: 'cold'});
  const [activeModal, setActiveModal] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment")
  }

  const closeActiveModal = () => {
    setActiveModal("");
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick}/>
        <Main weatherData={weatherData} />

        <Footer />
      </div>
      <ModalWithForm 
      buttonText='Add garment' 
      title='New garment'
      activeModal={activeModal}
      handleCloseClick={closeActiveModal}>
      <label htmlFor="name" className="modal__label" >Name
                        <input  id="name" type="text" className="modal__input" placeholder="Name" />
                        <span id="input-error" class="modal__input-error"></span>
                    </label>

                    <label htmlFor="image" className="modal__label" >Image
                        <input id="image" type="url" className="modal__input" placeholder="Image URL" />
                    </label>

                <fieldset className="modal__radio-buttons">
                    <legend className="modal__label">Select the weather type:</legend>
                    <label htmlFor="hot" className="modal__label modal__label_type_radio"> Hot
                        <button id="hot" type="radio" className="modal__radio-input"></button>
                    </label>
                    <label htmlFor="warm" className="modal__label modal__label_type_radio"> Warm
                        <button id="warm" type="radio" className="modal__radio-input"></button>
                    </label>
                    <label htmlFor="cold" className="modal__label modal__label_type_radio"> Cold
                        <button id="cold" type="radio" className="modal__radio-input"></button>
                    </label>
                </fieldset>
      </ModalWithForm>
    </div>
  )
}

export default App
