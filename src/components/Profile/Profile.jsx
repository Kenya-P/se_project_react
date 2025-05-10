import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import './Profile.css';
import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
//import EditProfileModal from '../EditProfileModal/EditProfileModal';


function Profile({handleAddClick, clothingItems, onClick, handleEditProfileClick, onSignOutClick}) {

    const currentUser = useContext(CurrentUserContext);
    
    return (
        <div className="profile">
            <section className="profile__header">
                <div className="profile__header-container">
                    <h1 className="profile__title">Hello, {currentUser.name}!</h1>
                </div>
            </section>
            <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}>
                Edit Profile
            </button>
            <button className="profile__signout-button" type="button" onClick={onSignOutClick}>
                Sign Out
            </button>
            <section className="profile__sidebar">
                <SideBar />
            </section>
            <section className="profile__clothes-section" >
                <ClothesSection clothingItems={clothingItems} onAddNew={handleAddClick} onItemClick={onClick}/>
            </section>

        </div>
    );
};

export default Profile;