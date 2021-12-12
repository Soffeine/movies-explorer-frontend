import './LoginButton.css';
import { NavLink } from 'react-router-dom';
import { RouteTo } from '../../../utils/constants';

function LoginButton() {
    return (
      <NavLink to={RouteTo.SIGN_IN} className="button button_login">Войти</NavLink>
    );
}

export default LoginButton;