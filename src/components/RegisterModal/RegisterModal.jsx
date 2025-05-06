import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/useForm";


const initialFormValues = { name: "", email: "", password: "" };
export default function RegisterModal({ isOpen, onClose, onRegister, isLoading }) {
    const { values, handleChange, setValues } = useForm(initialFormValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(values)
            .then(() => {
                setValues({ name: "", email: "", password: "" });
                onClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <ModalWithForm
            buttonText={isLoading ? "Saving..." : "Register"}
            title="Sign up"
            name="register"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="name" className="modal__label">
                Name
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="modal__input"
                    placeholder="Name"
                    required
                    minLength="1"
                    maxLength="20"
                    onChange={handleChange}
                    value={values.name}
                />
                <span id="input-error" className="modal__input-error"></span>
            </label>

            <label htmlFor="email" className="modal__label">
                Email
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="modal__input"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    value={values.email}
                />
                <span id="input-error" className="modal__input-error"></span>
            </label>

            <label htmlFor="password" className="modal__label">
                Password
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="modal__input"
                    placeholder="Password"
                    required
                    minLength="6"
                    maxLength="20"
                    onChange={handleChange}
                    value={values.password}
                />
                <span id="input-error" className="modal__input-error"></span>
            </label>
        </ModalWithForm>
    );
}