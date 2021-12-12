import './Login.css';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Buttons/Button';
import { ButtonType, ButtonText } from '../../utils/constants';
import UserWelcomeMessage from '../UserWelcomeMessage/UserWelcomeMessage';

function Login() {
    return (
        <section className="login">
            <Button type={ButtonType.LOGO} />
            <UserWelcomeMessage text={'Рады видеть!'} />
            <form className="login__form">
                <Input type="email" text="E-mail" name="email" />
                <Input type="password" text="Пароль" name="password" />
            </form>
            <Button type={ButtonType.BLUE} text={ButtonText.SIGN_IN} />
            <p className="login__text">Ещё не зарегистрированы? <Link to='/signup' className="login__text_link">Регистрация</Link></p>
        </section>
    )
}

export default Login;