import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onUpdateUser, currentUser }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, avatar });
  }

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save"
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Avatar*
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;