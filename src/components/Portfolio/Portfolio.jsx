import './Portfolio.css';
import sign from '../../images/portfolio__link-sign.svg'

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__links">
                <li className="portfolio__link-item">
                    <p className="portfolio__link-text">Статичный сайт</p>
                    <a href="https://github.com/Soffeine/how-to-learn" className="portfolio__link">
                        <img src={sign} alt="перейти по ссылке" className="portfolio__link-sign" />
                    </a>
                </li>
                <li className="portfolio__link-item">
                <p className="portfolio__link-text">Адаптивный сайт</p>
                <a href="https://github.com/Soffeine/russian-travel" className="portfolio__link">
                    <img src={sign} alt="перейти по ссылке" className="portfolio__link-sign" />
                </a>
                </li>
                <li className="portfolio__link-item">
                <p className="portfolio__link-text">Одностраничное приложение</p>
                <a href="https://github.com/Soffeine/react-mesto-api-full" className="portfolio__link">
                    <img src={sign} alt="перейти по ссылке" className="portfolio__link-sign" />
                </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;