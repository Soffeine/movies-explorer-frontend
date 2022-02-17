import './Profile.css';
import Header from '../Header/Header';
import UserWelcomeMessage from '../UserWelcomeMessage/UserWelcomeMessage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useState, useEffect } from 'react';
import { omit } from 'lodash';
import validator from 'validator';


function Profile({ onSignout, loggedIn, onEditProfile, submitSpan }) {
    const currentUser = useContext(CurrentUserContext);
    const [profileValues, setProfileValues] = useState({});
    const [isValid, setIsValid] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setProfileValues({
            name: currentUser.name,
            email: currentUser.email
        })
    },[currentUser])

    const handleChangeProfile = (e) => {
        e.persist();
        let name = e.target.name;
        let value = e.target.value;
        validateInput(e, name, value);
        setProfileValues({
            ...profileValues,
            [name]: value,
        });
    }

    const validateInput = (e, name, value) => {
        switch(name) {
            case 'name':
                if(
                    new RegExp
                    (/[^a-zа-яё\-\s]/gi)
                    .test(value)
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
                if(!validator.isEmail(value)) {
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
        Object.keys(errors).length === 0
        && e.target.closest("form").checkValidity() ? setIsValid(true) : setIsValid(false);
    }

    const handleSubmitOnEdit = (e) => {
        e.preventDefault();
        onEditProfile(profileValues)
    }
    return (
        <>
            <Header loggedIn={loggedIn} />
            <section className="profile">
                <UserWelcomeMessage text={`Привет, ${currentUser.name}`} />
                <form className="profile__form" onSubmit={handleSubmitOnEdit}>
                    <div className="profile__input-container">
                        <label className="profile__label">Имя</label>
                        <input className="profile__input" type="text" name="name" required value={profileValues.name} onChange={handleChangeProfile} />
                    </div>
                    <div className="profile__input-error"><p className="profile__input-error-message">{errors.name}</p></div>
                    <div className="profile__input-container">
                        <label className="profile__label">E-mail</label>
                        <input className="profile__input" type="email" name="email" required value={profileValues.email} onChange={handleChangeProfile} />
                    </div>
                    <div className="profile__input-error"><p className="profile__input-error-message">{errors.email || submitSpan}</p></div>
                    <div className="profile__button-container">
                        <button className="profile__button profile__button_submit" type="submit" disabled={!isValid}>Редактировать</button>
                        <button className="profile__button profile__button_signout" type="button" onClick={onSignout}>Выйти из аккаунта</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Profile;