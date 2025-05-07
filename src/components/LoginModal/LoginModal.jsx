import './LoginModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../utils/useForm';

const initialFormValues = { email: '', password: '' };

function LoginModal({ isOpen, onClose, onLogin, isLoading }) {
    const { values, handleChange, setValues } = useForm(initialFormValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(values)
            .then(() => {
                setValues({ email: '', password: '' });
                onClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };



    return (
        <ModalWithForm
            buttonText={isLoading ? 'Saving...' : 'Login'}
            title="Sign in"
            name="login"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="login-email" className="modal__label">
                Email
                <input
                    id="login-email"
                    name="login-email"
                    type="email"
                    className="modal__input"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    value={values.email}
                />
                <span id="input-error" className="modal__input-error"></span>
            </label>

            <label htmlFor="login-password" className="modal__label">
                Password
                <input
                    id="login-password"
                    name="login-password"
                    type="password"
                    className="modal__input"
                    placeholder="Password"
                    required
                    minLength="8"
                    maxLength="20"
                    onChange={handleChange}
                    value={values.password}
                />
                <span id="input-error" className="modal__input-error"></span>
            </label>
        </ModalWithForm>
    );
}

export default LoginModal;