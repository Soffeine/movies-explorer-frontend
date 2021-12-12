import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <SectionTitle text="О проекте" />
            <div className="about-project__description">
                <div className="about-project__description_container">
                    <h2 className="about-project__title">
                        Дипломный проект включал 5 этапов
                    </h2>
                    <p className="about-project__text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__description_container">
                    <h2 className="about-project__title">
                        На выполнение диплома ушло 5 недель
                    </h2>
                    <p className="about-project__text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__plan">
                    <p className="about-project__term about-project__term_green">1 неделя</p>
                    <p className="about-project__term about-project__term_gray">4 недели</p>
                    <p className="about-project__term about-project__term_transparent">Back-end</p>
                    <p className="about-project__term about-project__term_transparent">Front-end</p>
            </div>
        </section>
    );
};

export default AboutProject;