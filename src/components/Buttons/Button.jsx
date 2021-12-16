import './Button.css'
import { ButtonType, ButtonText, RouteTo } from '../../utils/constants.js';
import TransparentButton from './TransparentButton/TransparentButton';
import LoginButton from './LoginButton/LoginButton';
import ProfileButton from './ProfileButton/ProfileButton';
import GrayButton from './GrayButton/GrayButton';
import BlueButton from './BlueButton/BlueButton';
import LogoButton from './LogoButton/LogoButton';

function Button({type=ButtonType.LOGIN, text=ButtonText.REGISTER, to=RouteTo.SIGN_UP }) {
    switch(type) {
        case ButtonType.LOGIN: {
            return <LoginButton />
        }
        case ButtonType.TRANSPARENT: {
            return <TransparentButton text={text} to={to} />
        }
        case ButtonType.PROFILE: {
            return <ProfileButton />
        }
        case ButtonType.GRAY: {
            return <GrayButton text={text} to={to} />
        }
        case ButtonType.BLUE: {
            return <BlueButton text={text} />
        }
        case ButtonType.LOGO: {
            return <LogoButton />
        }
        default: {
            return <LoginButton />
        }
    }
}

export default Button;