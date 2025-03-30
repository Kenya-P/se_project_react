import './ItemModal.css';

function ItemModal({ activeModal, handleCloseClick, item, handleDeleteClick }) {
    function handleDeleteClick() {
        onDeleteClick(item);
    }

    return (
     <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
        <div className={"modal__content-preview modal__content-preview_type_image"}>
            <button type="button" className="modal__close modal__close-preview" onClick={handleCloseClick}></button>
            <img src={item.link} alt={item.name} className="modal__image" />
            <div className="modal__footer">
                <h2 className="modal__caption">{item.name}</h2>
                <p className="modal__weather">Weather: {item.weather}</p>
            </div>
            <button className="modal__delete-button" type="button" onDeleteClick={handleDeleteClick} >Delete Item</button>
        </div>
    
    </div>
    );
}

export default ItemModal