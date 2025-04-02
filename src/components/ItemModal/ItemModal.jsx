import React from 'react';
import './ItemModal.css';
import useModalClose from '../../utils/UseModalClose';


function ItemModal({ activeModal, item, handleDeleteClick, isOpen, onClose }) {
    useModalClose(isOpen, onClose);


    return (
     <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
        <div className={"modal__content-preview modal__content-preview_type_image"}>
            <button type="button" className="modal__close modal__close-preview" onClick={onClose}></button>
            <img src={item.imageUrl} alt={item.name} className="modal__image" />
            <div className="modal__footer">
                <h2 className="modal__caption">{item.name}</h2>
                <p className="modal__weather">Weather: {item.weather}</p>
            </div>
            <button className="modal__delete-button" type="button" onClick={() => handleDeleteClick(item._id)} >Delete Item</button>
        </div>
    
    </div>
    );
}

export default ItemModal