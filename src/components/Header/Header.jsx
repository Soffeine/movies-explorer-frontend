import './Header.css';
import { ButtonType, ButtonText, RouteTo } from '../../utils/constants.js';
import Button from '../Buttons/Button';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header({ loggedIn }) {
    const [isShowHiddenMenu, setIsShowHiddenMenu] = useState(false);
    const hiddenMenuButtonClasses = (`header__menu-button ${isShowHiddenMenu ? 'header__menu-button_active' : ''}`);
    const headerContainer = (`header__container ${isShowHiddenMenu ? 'header__container_active' : ''}`);

    const handleMenuButtonClick = () => {
        setIsShowHiddenMenu(!isShowHiddenMenu);
    }
    return (
        <header className="header">
            {loggedIn ?  (
                    <div className="header__wrapper">
                        <Link to="/" className="header__logo" />
                        <div className={headerContainer}>
                        
                            <nav className="header__navigation_movies">
                                
                                <div className="header__navigation-links">
                                    <NavLink to={RouteTo.MAIN} className="header__navigation-link">Главная</ NavLink>
                                    <NavLink to={RouteTo.MOVIES} className="header__navigation-link">Фильмы</ NavLink>
                                    <NavLink to={RouteTo.SAVED_MOVIES} className="header__navigation-link">Сохранённые фильмы</ NavLink>
                                </div>
                                <Button type={ButtonType.PROFILE} />
                            </nav>
                        </div>
                        <button className={hiddenMenuButtonClasses} onClick={handleMenuButtonClick}></button>
                    </div>
                )
                :
                (
                    <div className="header__wrapper">
                        <Link to="/" className="header__logo" />
                        <nav className="header__navigation_auth">
                            <Button type={ButtonType.TRANSPARENT} to={RouteTo.SIGN_UP} text={ButtonText.REGISTER} />
                            <Button type={ButtonType.LOGIN} />
                        </nav>
                    </div>
                )
            
            }
        </header>
    );
}

export default Header;