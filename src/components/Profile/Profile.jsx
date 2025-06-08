import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import './Profile.css';

function Profile({handleAddClick, clothingItems, handleEditProfileClick, onLogoutClick, onClick, onItemLike}) {
    
    return (
        <div className="profile">
            <section className="profile__sidebar">
                <SideBar handleEditProfileClick={handleEditProfileClick} onLogoutClick={onLogoutClick}/>
            </section>
            <section className="profile__clothes-section" >
                <ClothesSection clothingItems={clothingItems} onAddNew={handleAddClick} onItemClick={onClick} onItemLike={onItemLike}/>
            </section>

        </div>
    );
};

export default Profile;