import './ModalWithForm.css';

function ModalWithForm() {
    return <div className="modal">
            <div className="modal__content">
                <h2 className="modal__title">New garment</h2>
                <button type="button" className="modal__close">Close</button>
                <form action="" className="modal__form">
                    <label htmlFor="name" className="modal__label" placeholder="Name">Name
                        <input  id="name" type="text" className="modal__input" />
                    </label>

                    <label htmlFor="image" className="modal__label" placeholder="Image URL">Image
                        <input id="image" type="url" className="modal__input" />
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
                    <button type="submit" className="modal__submit">Add garment</button>
                </form>
            </div>
        </div>
}

export default ModalWithForm;