import './Profile.css';
import Header from '../Header/Header';
import UserWelcomeMessage from '../UserWelcomeMessage/UserWelcomeMessage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';
import useForm from '../hooks/useForm';

function Profile({ onSignout, loggedIn, onEditProfile }) {
    const { values, isValid, errors, handleChangeOnRegister } = useForm()
    const currentUser = useContext(CurrentUserContext);

    const handleSubmitOnEdit = (e) => {
        e.preventDefault();
        onEditProfile(values)
    }
    return (
        <>
            <Header loggedIn={loggedIn} />
            <section className="profile">
                <UserWelcomeMessage text={`Привет, ${currentUser.name}`} />
                <form className="profile__form" onSubmit={handleSubmitOnEdit}>
                    <div className="profile__input-container">
                        <label className="profile__label">Имя</label>
                        <input className="profile__input" type="text" name="name" required defaultValue={currentUser.name} onChange={handleChangeOnRegister} />
                    </div>
                    <div className="profile__input-error"><p className="profile__input-error-message">{errors.name}</p></div>
                    <div className="profile__input-container">
                        <label className="profile__label">E-mail</label>
                        <input className="profile__input" type="email" name="email" required defaultValue={currentUser.email} onChange={handleChangeOnRegister} />
                    </div>
                    <div className="profile__input-error"><p className="profile__input-error-message">{errors.email}</p></div>
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