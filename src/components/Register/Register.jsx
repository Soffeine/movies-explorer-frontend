import './Register.css';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Buttons/Button';
import { ButtonType, ButtonText } from '../../utils/constants';
import UserWelcomeMessage from '../UserWelcomeMessage/UserWelcomeMessage';

function Register({ onRegister }) {

    const handleSubmitOnRegister = () => {
        onRegister(name, email, password)
    }

    const { handleChangeOnRegister, values, errors, isValid, handleSubmit } = useForm(handleSubmitOnRegister);
    let name = values.name;
    let email = values.email;
    let password = values.password;

    return (
        <section className="register">
            <Button type={ButtonType.LOGO} />
            <UserWelcomeMessage text={'Добро пожаловать!'} />
            <form className="form register__form" onSubmit={handleSubmit}>
                <Input type="text" text="Имя" name="name"
                    value={name}
                    onChange={handleChangeOnRegister}
                    errorMessage={errors.name}
                />
                <Input type="email" text="E-mail" name="email"
                    onChange={handleChangeOnRegister}
                    errorMessage={errors.email}
                    value={email}
                />
                <Input type="password" text="Пароль" name="password"
                    onChange={handleChangeOnRegister}
                    errorMessage={errors.password}
                    value={password}
                />
                <button className={(`button_blue ${isValid ? '' : 'button_blue_disabled'}`)} type="submit" disabled={!isValid}>{ButtonText.SIGN_UP}</button>
            </form>
            <p className="register__text">Уже зарегестрированы? <Link to='/signin' className="register__text_link">Войти</Link></p>
        </section>
    )
}

export default Register;