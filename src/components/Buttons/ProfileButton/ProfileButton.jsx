import './ProfileButton.css';
import profileButton from '../../../images/profile-button.svg';
import { NavLink } from 'react-router-dom';
import { RouteTo } from '../../../utils/constants';


function ProfileButton() {
    return(
        <NavLink to={RouteTo.PROFILE} className="button_profile">
            <img src={profileButton} className="button_profile-pic" alt="открыть профиль пользователя" />
        </NavLink>
    )
}

export default ProfileButton;