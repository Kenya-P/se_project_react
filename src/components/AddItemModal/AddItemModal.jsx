import './AddItemModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../utils/useForm';
//import { useState } from 'react';


const initialFormValues = {name: "", imageUrl: "", weather: ""};

export default function AddItemModal({isOpen, onClose, onAddItemModalSubmit, isLoading}) {
    const {values, handleChange, setValues} = useForm(initialFormValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItemModalSubmit(values)
        .then(() => {
            setValues({name: "", imageUrl: "", weather: ""});
            onClose();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <ModalWithForm buttonText={isLoading ? 'Saving...' : 'Add garment'} title='New garment' name='add-garment' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <label htmlFor="name" className="modal__label" >Name
                <input  id="name" name="name" type="text" className="modal__input" placeholder="Name" required minLength="1" maxLength="20" onChange={handleChange} value={values.name}/>
                <span id="input-error" className="modal__input-error"></span>
            </label>

            <label htmlFor="image" className="modal__label" >Image
                <input id="image" name="imageUrl" type="url" className="modal__input" placeholder="Image URL" required onChange={handleChange} value={values.imageUrl}/>
            </label>

            <fieldset className="modal__radio-buttons">
                <legend className="modal__label">Select the weather type:</legend>
                <label htmlFor="hot" className="modal__label modal__label_type_radio" name="weather"> hot
                    <input id="hot" type="radio" className="modal__radio-input" name="weather" onChange={handleChange} value="hot" checked={values.weather === "hot"}></input>
                </label>
                <label htmlFor="warm" className="modal__label modal__label_type_radio" name="weather"> warm
                    <input id="warm" type="radio" className="modal__radio-input" name="weather" onChange={handleChange} value="warm" checked={values.weather === "warm"}></input>
                </label>
                <label htmlFor="cold" className="modal__label modal__label_type_radio" name="weather"> cold
                    <input id="cold" type="radio" className="modal__radio-input" name="weather" onChange={handleChange} value="cold" checked={values.weather === "cold"}></input>
                </label>
            </fieldset>
        </ModalWithForm>
    )
}