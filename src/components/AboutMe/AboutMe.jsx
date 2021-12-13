import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import photo from '../../images/about-me-demo.png';
import { ButtonText, RouteTo } from '../../utils/constants.js';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <SectionTitle text="Студент" />
            <div className="about-me__container">
                <div className="about-me__description">
                    <h2 className="about-me__title">Софья</h2>
                    <h3 className="about-me__subtitle">Фронтенд-разработчик, 25 лет</h3>
                    <p className="about-me__text">
                        Я живу в Санкт-Петербурге, закончила факультет педагогики МГПУ ИИЯ.
                        Люблю читать, учить языки (владею английским и итальянским), и фильмы Уэса Андерсона.
                        В конце 2020 года начала интересоваться веб-разработкой, а уже в декабре пошла на полноценный курс. После его
                        окончания планирую сначала научиться писать нормально такие тексты о себе, а потом искать работу в этой сфере.
                    </p>
                    <div className="about-me__links">
                        <a href={RouteTo.FACEBOOK} target="_blank" className="about-me__link">{ButtonText.FACEBOOK}</a>
                        <a href={RouteTo.GITHUB} target="_blank" className="about-me__link">{ButtonText.GITHUB}</a>
                    </div>
                </div>
                <img className="about-me__photo" src={photo} alt="фото студента" />
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;