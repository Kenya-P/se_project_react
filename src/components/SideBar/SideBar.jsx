import './SideBar.css';
import Avatar from '../../assets/Avatar.svg';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';



function SideBar({handleEditProfileClick, onLogoutClick}) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <div className="sidebar">
            <div className="sidebar__user-profile">
                <img className="sidebar__avatar" src={currentUser.avatar} alt="Avatar Image" />
                <p className="sidebar__username">{currentUser.name}</p>
            </div>
            <div className="sidebar__button-container">
                <button className="sidebar__edit-profile-button" type="button" onClick={handleEditProfileClick}>
                    Change profile data
                </button>
                <button className="sidebar__logout-button" type="button" onClick={onLogoutClick}>
                    Log out
                </button>
            </div>
        </div>
    );
};

export default SideBar;