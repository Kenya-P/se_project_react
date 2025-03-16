import './ItemModal.css';

function ItemModal({ activeModal, handleCloseClick, item }) {
    return (
     <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
        <div className={"modal__content modal__content_type_image"}>
            <button type="button" className="modal__close" onClick={handleCloseClick}></button>
            <img src={item.link} alt={item.name} className="modal__image" />
            <div className="modal__footer">
                <h2 className="modal__caption">{item.name}</h2>
                <p className="modal__weather">Weather: {item.weather}</p>
            </div>
        </div>
    
    </div>
    );
}

export default ItemModal