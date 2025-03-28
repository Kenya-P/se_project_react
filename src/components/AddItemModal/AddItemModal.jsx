import './AddItemModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useState } from 'react';


export default function AddItemModal({isOpen, onClose, onAddItemModalSubmit}) {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [weather, setWeather] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    }

    const handleWeatherChange = (e) => {
        setWeather(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItemModalSubmit({ name, imageUrl, weather });
        setName("");
        setImageUrl("");
        setWeather("");
    }

    return (
        <ModalWithForm buttonText='Add garment' title='New garment' name='add-garment' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <label htmlFor="name" className="modal__label" >Name
                <input  id="name" type="text" className="modal__input" placeholder="Name" required minLength="1" maxLength="20" onChange={handleNameChange} value={name}/>
                <span id="input-error" className="modal__input-error"></span>
            </label>

            <label htmlFor="image" className="modal__label" >Image
                <input id="image" type="url" className="modal__input" placeholder="Image URL" required onChange={handleImageUrlChange} value={imageUrl}/>
            </label>

            <fieldset className="modal__radio-buttons">
                <legend className="modal__label">Select the weather type:</legend>
                <label htmlFor="hot" className="modal__label modal__label_type_radio" name="weather"> Hot
                    <input id="hot" type="radio" className="modal__radio-input" name="weather" onChange={handleWeatherChange} value="Hot" checked={weather === "Hot"}></input>
                </label>
                <label htmlFor="warm" className="modal__label modal__label_type_radio" name="weather"> Warm
                    <input id="warm" type="radio" className="modal__radio-input" name="weather" onChange={handleWeatherChange} value="Warm" checked={weather === "Warm"}></input>
                </label>
                <label htmlFor="cold" className="modal__label modal__label_type_radio" name="weather"> Cold
                    <input id="cold" type="radio" className="modal__radio-input" name="weather" onChange={handleWeatherChange} value="Cold" checked={weather === "Cold"}></input>
                </label>
            </fieldset>
        </ModalWithForm>
    )
}