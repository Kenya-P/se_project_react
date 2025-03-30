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
                <ClothesSection clothingItems={clothingItems} onClick={onClick} handleAddClick={handleAddClick}/>
            </section>

        </div>
    );
};

export default Profile;