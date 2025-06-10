import './ItemModal.css';
import React from 'react';
import useModalClose from '../../utils/UseModalClose';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemModal({ activeModal, item, handleDeleteClick, isOpen, onClose }) {
    useModalClose(isOpen, onClose);
    const currentUser = React.useContext(CurrentUserContext);

    if (!item) return null; // Prevents rendering when no item is selected

    const isOwner = item?.owner === currentUser?._id;
    const itemDeleteButton = `modal__delete-button ${isOwner ? '' : 'modal__delete-button_hidden'}`;

    return (
        <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
            <div className="modal__content-preview modal__content-preview_type_image">
                <button
                    type="button"
                    className="modal__close modal__close-preview"
                    onClick={onClose}
                ></button>
                <img
                    src={item.imageUrl}
                    alt={item.name || 'Clothing item'}
                    className="modal__image"
                />
                <div className="modal__footer">
                    <h2 className="modal__caption">{item.name}</h2>
                    <p className="modal__weather">Weather: {item.weather}</p>
                </div>
                {isOwner && (
                    <button
                        className={itemDeleteButton}
                        type="button"
                        onClick={() => handleDeleteClick(item._id)}
                    >Delete Item
                    </button>
                )}
            </div>
        </div>
    );
}

export default ItemModal;
