import './Header.css';
import logo from '../../assets/Wtwr-Logo.svg';
import avatar from '../../assets/Avatar.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { useState } from 'react';

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric'});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
        <img src={logo} alt="App Logo" className="header__logo" />
        <p className="header__date-location">{currentDate}, {weatherData.city} {weatherData.temp.F}&deg; F</p>
        <button className="header__menu-button" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}></button>       
        <div className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu_opened' : ''}`}>
          <button className="header__mobile-menu_close" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}></button>
          <ToggleSwitch />
          <button onClick={handleAddClick} type="button" className="header__clothes-button">+ Add Clothes</button>
          <div className="header__user-container">
              <p className="header__username">Terrence Tegegne</p>
              <img src={avatar} alt="User Avatar" className="header__avatar" />
          </div>
        </div>
    </header>
  );

}


export default Header;