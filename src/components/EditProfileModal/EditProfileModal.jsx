import React, { useContext, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../utils/useFormAndValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function EditProfileModal({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues, errors, isValid, resetForm } = useFormAndValidation();

  // Set current user data into form when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || '',
        avatar: currentUser.avatar || '',
      });
    }
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  function handleClose() {
    onClose();
    resetForm();
  }

  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Saving...' : 'Save'}
      isValid={isValid}
    >
      <label className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className="modal__input"
          value={values.name || ''}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="30"
        />
        <span className="modal__input-error">{errors.name}</span>
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          name="avatar"
          type="url"
          className="modal__input"
          value={values.avatar || ''}
          onChange={handleChange}
          required
        />
        <span className="modal__input-error">{errors.avatar}</span>
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
