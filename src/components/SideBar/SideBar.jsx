import './SideBar.css';
import Avatar from '../../assets/Avatar.svg';

function SideBar({handleEditProfileClick, onLogoutClick}) {
    return (
        <div className="sidebar">
            <div className="sidebar__user-profile">
                <img className="sidebar__avatar" src={Avatar} alt="Avatar Image" />
                <p className="sidebar__username">Terrence Tegegne</p>
            </div>
            <div className="sidebar__button-container">
                <button className="sidebar__edit-profile-button" type="button" onClick={handleEditProfileClick}>
                    Change profile
                </button>
                <button className="sidebar__logout-button" type="button" onClick={onLogoutClick}>
                    Log out
                </button>
            </div>
        </div>
    );
};

export default SideBar;