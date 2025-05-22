import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/useFormAndValidation";

function RegisterModal({ isOpen, onClose, onRegister, isLoading, onClickLogin }) {
    const {
        values,
        handleChange,
        setValues,
        errors,
        resetForm,
        isValid
    } = useFormAndValidation({
        name: '',
        email: '',
        password: '',
        avatar: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid && Object.keys(errors).length === 0) {
            onRegister({
                name: values.name,
                email: values.email,
                password: values.password,
                avatar: values.avatar
            });
        }
    };

    const handleClose = () => {
        onClose();
        resetForm();
    };

    return (
        <ModalWithForm
            buttonText={isLoading ? "Saving..." : "Sign Up"}
            title="Sign up"
            name="register"
            isOpen={isOpen}
            onClose={handleClose}
            onOverlayClose={handleClose}
            onSubmit={handleSubmit}
            secondaryButtonText={"or Log in"}
            secondaryButtonLink="/signin"
            secondaryButtonAction={onClickLogin}
        >

            <label htmlFor="register-email" className="modal__label">
                Email
                <input
                    id="register-email"
                    name="email"
                    type="email"
                    className="modal__input"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    value={values.email || ''}
                />
                <span className="modal__input-error">{errors.email}</span>
            </label>

            <label htmlFor="register-password" className="modal__label">
                Password
                <input
                    id="register-password"
                    name="password"
                    type="password"
                    className="modal__input"
                    placeholder="Password"
                    required
                    minLength="8"
                    maxLength="20"
                    title="Password must be at least 8 characters and and contain at least one letter and one number."
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={handleChange}
                    value={values.password || ''}
                />
                <span className="modal__input-error">{errors.password}</span>
            </label>

            <label htmlFor="register-name" className="modal__label">
                Name
                <input
                    id="register-name"
                    name="name"
                    type="text"
                    className="modal__input"
                    placeholder="Name"
                    required
                    minLength="2"
                    maxLength="20"
                    title="Name can only contain letters, numbers, and the following characters: - _ . , '"
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={handleChange}
                    value={values.name || ''}
                />
                <span className="modal__input-error">{errors.name}</span>
            </label>

            <label htmlFor="register-avatar" className="modal__label">
                Avatar
                <input
                    id="register-avatar"
                    name="avatar"
                    type="url"
                    className="modal__input"
                    placeholder="Avatar URL"
                    title="Please enter a valid URL."
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={handleChange}
                    value={values.avatar || ''}
                />
                <span className="modal__input-error">{errors.avatar}</span>
            </label>
        </ModalWithForm>
    );
}

export default RegisterModal;
