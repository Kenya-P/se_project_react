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
    } = useFormAndValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid && Object.keys(errors).length === 0) {
            onRegister({
                name: values.name,
                email: values.email,
                password: values.password,
            });
        }
    };

    const handleClose = () => {
        onClose();
        resetForm();
    };

    return (
        <ModalWithForm
            buttonText={isLoading ? "Saving..." : "Register"}
            title="Sign up"
            name="register"
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleSubmit}
            secondaryButtonText="Already a member? Sign Up"
            secondaryButtonLink="/signin"
            secondaryButtonAction={onClickLogin}
        >
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
                    pattern="^[a-zA-Z0-9-_.,' ]+$"
                    title="Name can only contain letters, numbers, and the following characters: - _ . , '"
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={handleChange}
                    value={values.name || ''}
                />
                <span className="modal__input-error">{errors.name}</span>
            </label>

            <label htmlFor="register-email" className="modal__label">
                Email
                <input
                    id="register-email"
                    name="email"
                    type="email"
                    className="modal__input"
                    placeholder="Email"
                    required
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;,.<>?/-]).{8,}$"
                    title="Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={handleChange}
                    value={values.password || ''}
                />
                <span className="modal__input-error">{errors.password}</span>
            </label>
        </ModalWithForm>
    );
}

export default RegisterModal;
