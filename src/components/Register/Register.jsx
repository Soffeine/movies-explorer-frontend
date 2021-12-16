import './Register.css';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Buttons/Button';
import { ButtonType, ButtonText } from '../../utils/constants';
import UserWelcomeMessage from '../UserWelcomeMessage/UserWelcomeMessage';

function Register() {
    return (
        <section className="register">
            <Button type={ButtonType.LOGO} />
            <UserWelcomeMessage text={'Добро пожаловать!'} />
            <form className="register__form">
                <Input type="text" text="Имя" name="name" />
                <Input type="email" text="E-mail" name="email" />
                <Input type="password" text="Пароль" name="password" />
            </form>
            <Button type={ButtonType.BLUE} text={ButtonText.SIGN_UP} />
            <p className="register__text">Уже зарегестрированы? <Link to='/signin' className="register__text_link">Войти</Link></p>
        </section>
    )
}

export default Register;