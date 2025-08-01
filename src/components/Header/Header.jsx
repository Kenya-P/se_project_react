import logo from '../../assets/Wtwr-Logo.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Header.css';

function Header({ onAddClick, weatherData, onLoginClick, onRegisterClick }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser?._id;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const avatarContent = currentUser?.avatar ? (
    <img src={currentUser.avatar} alt="User avatar" className="header__user-avatar" />
  ) : (
    <div className="header__avatar-placeholder">
      {currentUser?.name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="App Logo" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {`${currentDate}, ${weatherData?.city || "Your City"}`}
      </p>
      <button className="header__menu-button" type="button" onClick={toggleMenu}></button>

      <div className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu_opened' : ''}`}>
        <button className="header__mobile-menu_close" type="button" onClick={toggleMenu}></button>
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className={"header__menu-content"}>
            <button onClick={onAddClick} type="button" className="header__clothes-button">
              + Add Clothes
            </button>
            <Link to="/profile" className="header__user-link">
              <div className="header__user-container">
                {avatarContent}
                <p className="header__username">{currentUser.name}</p>
              </div>
            </Link>
          </div>
        ) : (
          <div className="header__buttons-container">
            <button onClick={onLoginClick} className="header__login-button" type="button">
              Log In
            </button>
            <button onClick={onRegisterClick} className="header__register-button" type="button">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
