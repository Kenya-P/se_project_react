import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import './Profile.css';
import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';


function Profile({handleAddClick, clothingItems, handleEditProfileClick, onLogoutClick, onClick}) {

    const currentUser = useContext(CurrentUserContext);
    
    return (
        <div className="profile">
            <section className="profile__header">
                <div className="profile__header-container">
                    <h1 className="profile__title">Hello, {currentUser.name}!</h1>
                </div>
            </section>
            <section className="profile__sidebar">
                <SideBar handleEditProfileClick={handleEditProfileClick} onLogoutClick={onLogoutClick}/>
            </section>
            <section className="profile__clothes-section" >
                <ClothesSection clothingItems={clothingItems} onAddNew={handleAddClick} onItemClick={onClick}/>
            </section>

        </div>
    );
};

export default Profile;