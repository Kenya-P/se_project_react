import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import './Profile.css';



function Profile({handleAddClick, clothingItems, onClick}) {
    return (
        <div className="profile">
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