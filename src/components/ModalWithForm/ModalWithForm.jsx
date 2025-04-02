import React from 'react';
import './ModalWithForm.css';
import useModalClose from '../../utils/UseModalClose';

function ModalWithForm({children, buttonText, title, isOpen, onClose, name, onSubmit}) {
    useModalClose(isOpen, onClose);
    
    return (
        <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
            <div className="modal__content">
                <button
                    type="button"
                    onClick={onClose}
                    className="modal__close"
                />
                <h3 className="modal__title">{title}</h3>
                <form onSubmit={onSubmit} className="modal__form">
                    {children}
                    <button type="submit" className="modal__submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;