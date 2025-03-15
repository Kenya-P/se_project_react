import './Header.css';
import logo from '../../assets/Wtwr-Logo.svg';
import avatar from '../../assets/Avatar.svg';

function Header({ handleAddClick }) {
  return (
    <header className="header">
        <img src={logo} alt="App Logo" className="header__logo" />
        <p className="header__date-location">Date & Location</p>
        <button onClick={handleAddClick} type="button" className="header__clothes-button">+ Add Clothes</button>
        <div className="header__user-container">
            <p className="header__username">Username</p>
            <img src={avatar} alt="User Avatar" className="header__avatar" />
        </div>
    </header>
  );

/*function Data() {
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric'});
}; */
}

export default Header;