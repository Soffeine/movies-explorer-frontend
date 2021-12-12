import './Footer.css'
import { ButtonText, RouteTo } from '../../utils/constants.js';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className="footer__date">&copy; 2021</p>
                <div className="footer__link-container">
                    <a href={RouteTo.PRAKTIKUM} className="footer__link">{ButtonText.PRAKTIKUM}</a>
                    <a href={RouteTo.GITHUB} className="footer__link">{ButtonText.GITHUB}</a>
                    <a href={RouteTo.FACEBOOK} className="footer__link">{ButtonText.FACEBOOK}</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;