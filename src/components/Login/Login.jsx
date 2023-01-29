import './Login.css';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Buttons/Button';
import { ButtonType, ButtonText } from '../../utils/constants';
import UserWelcomeMessage from '../UserWelcomeMessage/UserWelcomeMessage';


function Login({ onLogin, submitError }) {

    // Регистрация пользователя
    const handleSubmitOnLogin = (e) => {
        e.preventDefault();
        onLogin(values)
    }

    const { values, errors, isValid, handleChangeOnLogin } = useForm();
    let email = values.email;
    let password = values.password;

    return (
        <section className="login">
            <Button type={ButtonType.LOGO} />
            <UserWelcomeMessage text={'Рады видеть!'} />
            <form className="login__form" onSubmit={handleSubmitOnLogin}>
                <Input type="email" text="E-mail" name="email"
                    value={email}
                    onChange={handleChangeOnLogin}
                    errorMessage={errors.email}
                />
                <Input type="password" text="Пароль" name="password"
                    value={password}
                    onChange={handleChangeOnLogin}
                    errorMessage={errors.password || submitError}
                />
                <button className={(`button_blue ${isValid ? '' : 'button_blue_disabled'}`)} type="submit" disabled={!isValid}>{ButtonText.SIGN_IN}</button>
            </form>
            <p className="login__text">Ещё не зарегистрированы? <Link to='/signup' className="login__text_link">Регистрация</Link></p>
        </section>
    )
}

export default Login;