import "./DeleteItemModal.css";

function DeleteItemModal ({ isOpen, onClose, onClick }) { 
  return ( 
   <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
     <div className="modal__content-delete">
       <button className="modal__close" type="button" onClick={onClose}></button>
       <p className="modal__delete-text">Are you sure you want to delete this item? This action is irreversible</p>
       <button className="modal__delete-confirm" type="button" onClick={onClick}>Yes, delete item</button>
       <button className="modal__delete-cancel" type="button" onClick={onClose}>Cancel</button>
     </div>
   </div>
  )
  }

export default DeleteItemModal;