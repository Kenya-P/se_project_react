import './SideBar.css';
import Avatar from '../../assets/Avatar.svg';

function SideBar({handleEditProfileClick, onLogoutClick}) {
    return (
        <div className="sidebar">
            <img className="sidebar__avatar" src={Avatar} alt="Avatar Image" />
            <p className="sidebar__username">Terrence Tegegne</p>
            <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}>
                Change profile data
            </button>
            <button className="profile__logout-button" type="button" onClick={onLogoutClick}>
                Log out
            </button>
        </div>
    );
};

export default SideBar;