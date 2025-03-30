import './SideBar.css';
import Avatar from '../../assets/Avatar.svg';

function SideBar() {
    return (
        <div className="sidebar">
            <img className="sidebar__avatar" src={Avatar} alt="Avatar Image" />
            <p className="sidebar__username">Terrence Tegegne</p>
        </div>
    );
};

export default SideBar;