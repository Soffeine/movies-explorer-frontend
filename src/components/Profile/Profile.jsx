import './Profile.css';
import Header from '../Header/Header';
import UserWelcomeMessage from '../UserWelcomeMessage/UserWelcomeMessage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useState, useEffect } from 'react';
import { omit } from 'lodash';
import validator from 'validator';
import { useRef } from 'react';


function Profile({ onSignout, loggedIn, onEditProfile, submitSpan }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({});

    const emailRef = useRef();
    const formRef = useRef();

    const [isNeedButtonDisabled, setIsNeedButtonDisabled] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }
    }, [currentUser])

    const handleChangeName = (e) => {
        setName(e.target.value);
        validateInput('name')
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        validateInput('email');
    }


    const validateInput = (inputName) => {
        switch (inputName) {
            case 'name':
                if (
                    new RegExp
                        (/[^a-zа-яё\-\s]/gi)
                        .test(name || '')
                ) {
                    setErrors({
                        ...errors,
                        name: 'Имя может содержать латиницу, кириллицу, дефисы и пробелы'
                    })
                } else {
                    let newObj = omit(errors, "name");
                    setErrors(newObj);
                }
                break;
            case 'email':
                if (!validator.isEmail(emailRef.current.value)) {
                    setErrors({
                        ...errors,
                        email: 'Некорректный адрес'
                    })
                } else {
                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                }
                break;
            default:
                break;
        }
    }

    const handleSubmitOnEdit = (e) => {
        e.preventDefault();
        onEditProfile(name, email)
    }

    const checkNameChange = () => {
        if (currentUser.name === name) {
            console.log(true)
            return true;
        }
        console.log(false);
        return false;
    }

    const checkEmailChange = () => {
        if(currentUser.email === email) {
            console.log(true)
            return true;
        }
        console.log(false);
        return false;
    }

    useEffect(() => {
        setIsNeedButtonDisabled(() => checkNameChange())
    }, [name])

    useEffect(() => {
        setIsNeedButtonDisabled(() => checkEmailChange())
    }, [email])

    return (
        <>
            <Header loggedIn={loggedIn} />
            <section className="profile">
                <UserWelcomeMessage text={`Привет, ${currentUser.name}`} />
                <form ref={formRef} className="profile__form" onSubmit={handleSubmitOnEdit}>
                    <div className="profile__input-container">
                        <label className="profile__label">Имя</label>
                        <input className="profile__input" type="text" name="name" required value={name} onChange={handleChangeName} />
                    </div>
                    <div className="profile__input-error"><p className="profile__input-error-message">{errors.name}</p></div>
                    <div className="profile__input-container">
                        <label className="profile__label">E-mail</label>
                        <input ref={emailRef} className="profile__input" type="email" name="email" required value={email}  onChange={handleChangeEmail} />
                    </div>
                    <div className="profile__input-error"><p className="profile__input-error-message">{errors.email || submitSpan}</p></div>
                    <div className="profile__button-container">
                        <button className="profile__button profile__button_submit" type="submit" disabled={isNeedButtonDisabled}>Редактировать</button>
                        <button className="profile__button profile__button_signout" type="button" onClick={onSignout}>Выйти из аккаунта</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Profile;