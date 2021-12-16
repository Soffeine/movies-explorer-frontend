import './Profile.css';
import Header from '../Header/Header';
import UserWelcomeMessage from '../UserWelcomeMessage/UserWelcomeMessage';

function Profile() {
    return (
        <>
            <Header loggedIn={true} />
            <section className="profile">
                <UserWelcomeMessage text={`Привет, Софья!`} />
                <form className="profile__form">
                    <div className="profile__input-container">
                        <label className="profile__label">Имя</label>
                        <input className="profile__input" type="text" name="name" required value="Софья" />
                    </div>
                    <div className="profile__input-container">
                        <label className="profile__label">E-mail</label>
                        <input className="profile__input" type="email" name="email" required value="sofya@email.com" />
                    </div>
                </form>
                <div className="profile__button-container">
                    <button className="profile__button profile__button_submit" type="submit">Редактировать</button>
                    <button className="profile__button profile__button_signout" type="button">Выйти из аккаунта</button>
                </div>
            </section>
        </>
    )
}

export default Profile;