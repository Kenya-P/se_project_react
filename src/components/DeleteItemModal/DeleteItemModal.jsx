import "./DeleteItemModal.css";

function DeleteItemModal ({ activeModal, onClose, onSubmit }) {
  return (
    <div className={`modal ${activeModal === "delete" ? "modal_opened": ""}`}>
      <div className="modal__content modal__content-delete">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src="src\assets\close.svg" alt="Close" />
        </button>
        <p className="delete__text">Are you sure you want to delete this item? This action is irreversible</p>
        <button className="delete__confirm" type="button" onSubmit={onSubmit} >Yes, delete item</button>
        <button className="delete__cancel" type="button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteItemModal;